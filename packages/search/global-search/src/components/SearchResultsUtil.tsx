import * as React from 'react';
import { ComponentType } from 'react';
import {
  PersonResult as PersonResultComponent,
  ContainerResult as ContainerResultComponent,
} from '@atlaskit/quick-search';
import JiraIcon from '@atlaskit/icon/glyph/jira';
import {
  Result,
  ContainerResult,
  JiraObjectResult,
  PersonResult,
  AnalyticsType,
  ResultType,
  ConfluenceObjectResult,
  ContentType,
} from '../model/Result';
import AdvancedSearchResult from './AdvancedSearchResult';
import ObjectResultComponent from './ObjectResult';
import { withAnalyticsEvents } from '@atlaskit/analytics-next';
import {
  DEFUALT_GAS_CHANNEL,
  DEFAULT_GAS_SOURCE,
  DEFAULT_GAS_ATTRIBUTES,
} from '../util/analytics';

export interface BaseResultProps {
  type: string;
  name: string;
  resultId: string;
  href: string;
  avatarUrl?: string;
}

export interface ObjectResultProps extends BaseResultProps {
  containerName?: string;
  contentType?: ContentType;
  objectKey?: string;
}

export interface ContainerResultProps extends BaseResultProps {}

export interface PersonResultProps extends BaseResultProps {
  mentionName?: string;
  presenceMessage?: string;
}

function createAndFireSearchResultSelectedEvent(createEvent, props): void {
  const event = createEvent(); // created empty to initialise with context
  const searchSessionId = event.context[0]
    ? event.context[0].searchSessionId
    : null;
  event.update({
    action: 'selected',
    actionSubject: 'navigationItem',
    actionSubjectId: 'searchResult',
    eventType: 'track',
    source: DEFAULT_GAS_SOURCE,
    attributes: {
      searchSessionId: searchSessionId,
      resultType: props.type,
      ...DEFAULT_GAS_ATTRIBUTES,
    },
  });
  event.fire(DEFUALT_GAS_CHANNEL);
}

const searchResultsAnalyticsEvents = {
  onClick: createAndFireSearchResultSelectedEvent,
};

export const ObjectResultWithAnalytics: ComponentType<
  ObjectResultProps
> = withAnalyticsEvents(searchResultsAnalyticsEvents)(ObjectResultComponent);

export const PersonResultWithAnalytics: ComponentType<
  PersonResultProps
> = withAnalyticsEvents(searchResultsAnalyticsEvents)(PersonResultComponent);

export const ContainerResultWithAnalytics: ComponentType<
  ContainerResultProps
> = withAnalyticsEvents(searchResultsAnalyticsEvents)(ContainerResultComponent);

export function renderResults(results: Result[]) {
  return results.map(result => {
    const resultType: ResultType = result.resultType;

    switch (resultType) {
      case ResultType.ConfluenceObjectResult: {
        const confluenceResult = result as ConfluenceObjectResult;

        return (
          <ObjectResultWithAnalytics
            key={confluenceResult.resultId}
            resultId={confluenceResult.resultId}
            name={confluenceResult.name}
            href={confluenceResult.href}
            type={confluenceResult.analyticsType}
            contentType={confluenceResult.contentType}
            containerName={confluenceResult.containerName}
          />
        );
      }
      case ResultType.JiraObjectResult: {
        const jiraResult = result as JiraObjectResult;

        return (
          <ObjectResultWithAnalytics
            key={jiraResult.resultId}
            resultId={jiraResult.resultId}
            name={jiraResult.name}
            href={jiraResult.href}
            type={jiraResult.analyticsType}
            objectKey={jiraResult.objectKey}
            containerName={jiraResult.containerName}
            avatarUrl={jiraResult.avatarUrl}
          />
        );
      }
      case ResultType.GenericContainerResult: {
        const containerResult = result as ContainerResult;

        return (
          <ContainerResultWithAnalytics
            key={containerResult.resultId}
            resultId={containerResult.resultId}
            name={containerResult.name}
            href={containerResult.href}
            type={containerResult.analyticsType}
            avatarUrl={containerResult.avatarUrl}
          />
        );
      }
      case ResultType.PersonResult: {
        const personResult = result as PersonResult;

        return (
          <PersonResultWithAnalytics
            key={personResult.resultId}
            resultId={personResult.resultId}
            name={personResult.name}
            href={personResult.href}
            type={personResult.analyticsType}
            avatarUrl={personResult.avatarUrl}
            mentionName={personResult.mentionName}
            presenceMessage={personResult.presenceMessage}
          />
        );
      }
      default: {
        // Make the TS compiler verify that all enums have been matched
        const _nonExhaustiveMatch: never = resultType;
        throw new Error(
          `Non-exhaustive match for result type: ${_nonExhaustiveMatch}`,
        );
      }
    }
  });
}

export interface AdvancedSearchItemProps {
  query: string;
  icon: JSX.Element;
  text: string;
  showKeyboardLozenge?: boolean;
}

export const searchConfluenceItem = (props: AdvancedSearchItemProps) => (
  <AdvancedSearchResult
    href={getConfluenceAdvancedSearchLink(props.query)}
    key="search_confluence"
    resultId="search_confluence"
    text={props.text}
    icon={props.icon}
    type={AnalyticsType.AdvancedSearchConfluence}
    showKeyboardLozenge={props.showKeyboardLozenge || false}
  />
);

export const searchJiraItem = (query: string) => (
  <AdvancedSearchResult
    href={`/issues/?jql=${encodeURIComponent(`text ~ "${query}"`)}`}
    icon={<JiraIcon size="medium" label="Search Jira" />}
    key="search_jira"
    resultId="search_jira"
    text="Search for more Jira issues"
    type={AnalyticsType.AdvancedSearchJira}
  />
);

export const searchPeopleItem = (props: AdvancedSearchItemProps) => (
  <AdvancedSearchResult
    href={`/people/search?q=${encodeURIComponent(props.query)}`}
    icon={props.icon}
    key="search_people"
    resultId="search_people"
    text={props.text}
    type={AnalyticsType.AdvancedSearchPeople}
  />
);

export function getConfluenceAdvancedSearchLink(query?: string) {
  const queryString = query ? `?queryString=${encodeURIComponent(query)}` : '';
  return `/wiki/dosearchsite.action${queryString}`;
}

export function redirectToConfluenceAdvancedSearch(query = '') {
  // XPSRCH-891: this breaks SPA navigation. Consumer needs to pass in a redirect/navigate function.
  window.location.assign(getConfluenceAdvancedSearchLink(query));
}

export function take<T>(array: Array<T>, n: number) {
  return array.slice(0, n);
}

export function isEmpty<T>(array: Array<T>) {
  return array.length === 0;
}

/**
 *
 * Gracefully handle promise catch and returning default value
 * @param promise promise to handle its catch block
 * @param defaultValue value returned by the promise in case of error
 * @param errorHandler function to be called in case of promise rejection
 */
export function handlePromiseError<T>(
  promise: Promise<T>,
  defaultValue?: T,
  errorHandler?: ((reason: any) => T | void),
): Promise<T | undefined> {
  return promise.catch(error => {
    try {
      if (errorHandler) {
        errorHandler(error);
      }
    } catch {}
    return defaultValue;
  });
}
