import * as React from 'react';
import { Component } from 'react';
import { Node as PMNode } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';
import { ProviderFactory } from '@atlaskit/editor-common';
import { ProsemirrorGetPosHandler, ReactNodeProps } from '../../../nodeviews';
import {
  MediaPluginState,
  stateKey as mediaStateKey,
} from '../pm-plugins/main';
import { Context, ImageResizeMode } from '@atlaskit/media-core';

import { MediaProvider } from '../pm-plugins/main';
import {
  Card,
  CardDimensions,
  CardView,
  CardEventHandler,
  CardOnClickCallback,
  Identifier,
} from '@atlaskit/media-card';

import {
  MediaType,
  MediaBaseAttributes,
  withImageLoader,
  ImageStatus,
} from '@atlaskit/editor-common';

// This is being used by DropPlaceholder now
export const MEDIA_HEIGHT = 125;
export const FILE_WIDTH = 156;

export type Appearance = 'small' | 'image' | 'horizontal' | 'square';

export interface MediaNodeProps extends ReactNodeProps {
  getPos: ProsemirrorGetPosHandler;
  view: EditorView;
  node: PMNode;
  providerFactory?: ProviderFactory;
  cardDimensions: CardDimensions;
  isMediaSingle?: boolean;
  onClick?: () => void;
  onExternalImageLoaded?: (
    dimensions: { width: number; height: number },
  ) => void;
}

export interface Props extends Partial<MediaBaseAttributes> {
  type: MediaType;
  mediaProvider?: Promise<MediaProvider>;
  cardDimensions?: CardDimensions;
  onClick?: CardOnClickCallback;
  onDelete?: CardEventHandler;
  resizeMode?: ImageResizeMode;
  appearance?: Appearance;
  selected?: boolean;
  url?: string;
  imageStatus?: ImageStatus;
  context: Context;
  disableOverlay?: boolean;
}

class MediaNode extends Component<MediaNodeProps, {}> {
  private pluginState: MediaPluginState;
  private mediaProvider;

  state = {
    viewContext: undefined,
  };

  constructor(props) {
    super(props);
    const { view } = this.props;
    this.pluginState = mediaStateKey.getState(view.state);
    this.mediaProvider = props.mediaProvider;
  }

  componentDidMount() {
    this.handleNewNode(this.props);
    this.updateContext();
  }

  componentWillUnmount() {
    const { node } = this.props;
    this.pluginState.handleMediaNodeUnmount(node);
  }

  private updateContext = async () => {
    const mediaProvider = await this.mediaProvider;
    if (mediaProvider) {
      const mediaContext = await mediaProvider.viewContext;
      if (mediaContext) {
        this.setState({ viewContext: mediaContext });
      }
    }
  };

  render() {
    const { node, selected, cardDimensions, onClick } = this.props;
    const { id, type, collection, url, __key } = node.attrs;

    const { fileId = id } = this.pluginState.getMediaNodeState(__key);

    const identifier: Identifier =
      type === 'external'
        ? {
            dataURI: url!,
            name: url,
            mediaItemType: 'external-image',
          }
        : {
            id: fileId,
            mediaItemType: 'file',
            collectionName: collection!,
          };

    return !this.state.viewContext ? (
      <CardView status="loading" dimensions={cardDimensions} />
    ) : (
      <Card
        context={this.state.viewContext!}
        dimensions={cardDimensions}
        identifier={identifier}
        selectable={true}
        selected={selected}
        disableOverlay={true}
        onClick={onClick}
      />
    );
  }

  private handleNewNode = (props: MediaNodeProps) => {
    const { node } = props;
    this.pluginState.handleMediaNodeMount(node, () => this.props.getPos() + 1);
  };
}

export default withImageLoader(MediaNode);
