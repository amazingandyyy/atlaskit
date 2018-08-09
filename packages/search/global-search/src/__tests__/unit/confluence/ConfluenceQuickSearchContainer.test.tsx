import * as React from 'react';
import {
  ConfluenceQuickSearchContainer,
  Props,
} from '../../../components/confluence/ConfluenceQuickSearchContainer';
import { noResultsCrossProductSearchClient } from '../mocks/_mockCrossProductSearchClient';
import { noResultsPeopleSearchClient } from '../mocks/_mockPeopleSearchClient';
import {
  noResultsConfluenceClient,
  makeConfluenceClient,
} from '../mocks/_mockConfluenceClient';
import { shallowWithIntl } from '../helpers/_intl-enzyme-test-helper';
import { QuickSearchContainer } from '../../../components/common/QuickSearchContainer';
import {
  makeConfluenceObjectResult,
  makePersonResult,
  makeConfluenceContainerResult,
} from '../_test-util';
import * as AnalyticsHelper from '../../../util/analytics-event-helper';

const sessionId = 'sessionId';
function render(partialProps?: Partial<Props>) {
  const props: Props = {
    confluenceClient: noResultsConfluenceClient,
    crossProductSearchClient: noResultsCrossProductSearchClient,
    peopleSearchClient: noResultsPeopleSearchClient,
    useAggregatorForConfluenceObjects: false,
    ...partialProps,
  };

  // @ts-ignore - doesn't recognise injected intl prop
  return shallowWithIntl(<ConfluenceQuickSearchContainer {...props} />);
}

describe('ConfluenceQuickSearchContainer', () => {
  it('should render QuickSearchContainer with correct props', () => {
    const wrapper = render();
    const quickSearchContainer = wrapper.find(QuickSearchContainer);

    const props = quickSearchContainer.props();
    expect(props.intl).toHaveProperty('locale', 'en');
    expect(props).toHaveProperty('getSearchResultComponent');
  });

  it('should return recent viewed items', async () => {
    const mockConfluenceClient = makeConfluenceClient({
      getRecentItems() {
        return Promise.resolve([makeConfluenceObjectResult()]);
      },
    });

    const wrapper = render({
      confluenceClient: mockConfluenceClient,
    });
    const quickSearchContainer = wrapper.find(QuickSearchContainer);
    const recentItems = await quickSearchContainer
      .props()
      .getRecentItems(sessionId);
    expect(recentItems).toMatchObject({
      recentlyViewedPages: [
        {
          analyticsType: 'result-confluence',
          resultType: 'confluence-object-result',
          containerName: 'containerName',
          contentType: 'confluence-page',
          containerId: 'containerId',
          name: 'name',
          avatarUrl: 'avatarUrl',
          href: 'href',
        },
      ],
      recentlyViewedSpaces: [],
      recentlyInteractedPeople: [],
    });
  });

  it('should return search result', async () => {
    const wrapper = render({
      peopleSearchClient: {
        search() {
          return Promise.resolve([makePersonResult()]);
        },
        getRecentPeople() {
          return Promise.resolve([]);
        },
      },
    });

    const quickSearchContainer = wrapper.find(QuickSearchContainer);
    const searchResults = await quickSearchContainer
      .props()
      .getSearchResult('query', sessionId, 100);

    expect(searchResults).toMatchObject({
      objectResults: [],
      spaceResults: [],
      peopleResults: [
        {
          mentionName: 'mentionName',
          presenceMessage: 'presenceMessage',
          analyticsType: 'result-person',
          resultType: 'person-result',
          name: 'name',
          avatarUrl: 'avatarUrl',
          href: 'href',
        },
      ],
      // assert search performance timings
      searchTimings: {
        quickNavElapsedMs: expect.any(Number),
        confSearchElapsedMs: expect.any(Number),
        peopleElapsedMs: expect.any(Number),
      },
    });
  });

  describe('Pre and Post query analytics', () => {
    let firePreQueryShownEventSpy;
    let firePostQueryShownEventSpy;
    let quickSearchContainer;
    const mockEventObj = {
      update: () => mockEventObj,
      fire: () => {},
    };
    const createAnalyticsEvent = jest.fn(() => mockEventObj);
    beforeEach(() => {
      firePreQueryShownEventSpy = jest.spyOn(
        AnalyticsHelper,
        'firePreQueryShownEvent',
      );
      firePostQueryShownEventSpy = jest.spyOn(
        AnalyticsHelper,
        'firePostQueryShownEvent',
      );
      const wrapper = render({
        peopleSearchClient: {
          search() {
            return Promise.resolve([]);
          },
          getRecentPeople() {
            return Promise.resolve([makePersonResult()]);
          },
        },
        confluenceClient: makeConfluenceClient({
          getRecentSpaces() {
            return Promise.resolve([makeConfluenceContainerResult()]);
          },
        }),
        createAnalyticsEvent,
      });

      quickSearchContainer = wrapper.find(QuickSearchContainer);
    });
    it('should fire pre query analytics', () => {
      quickSearchContainer.props().fireShownPreQueryEvent(
        sessionId,
        {
          recentlyInteractedPeople: [makePersonResult()],
        },
        120,
      );
      expect(firePreQueryShownEventSpy).toHaveBeenCalledTimes(1);
      expect(firePreQueryShownEventSpy.mock.calls[0]).toMatchObject([
        {
          resultCount: 1,
          resultSectionCount: 1,
        },
        expect.any(Number),
        sessionId,
        createAnalyticsEvent,
      ]);
    });

    it('should fire post query analytics', () => {
      const startTime = 120;
      const elapsedMs = 201;
      const searchResult = {
        objectResults: [],
        spaceResults: [makeConfluenceContainerResult()],
        peopleResults: [],
      };
      const query = 'space';

      quickSearchContainer
        .props()
        .fireShownPostQueryEvent(
          startTime,
          elapsedMs,
          searchResult,
          sessionId,
          query,
        );
      expect(firePostQueryShownEventSpy).toHaveBeenCalledTimes(1);
      expect(firePostQueryShownEventSpy.mock.calls[0]).toMatchObject([
        {
          resultContext: [
            {
              results: [
                {
                  resultContentId: expect.any(String),
                },
              ],
            },
          ],
        },
        {
          elapsedMs,
          startTime,
        },
        sessionId,
        query,
        createAnalyticsEvent,
      ]);
    });
  });
});
