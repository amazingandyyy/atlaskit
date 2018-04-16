import * as React from 'react';
import { StatelessComponent } from 'react';
import AkSpinner from '@atlaskit/spinner';
import { Blanket, Header, Content, ErrorMessage } from './styled';
import { Model, FilePreview } from './domain';
import { ImageViewer } from './viewers/image';
import { VideoViewer } from './viewers/video';
import { PDFViewer } from './viewers/pdf';

export const Spinner: StatelessComponent<{}> = ({}) => (
  <AkSpinner invertColor size="large" />
);

export type Props = {
  model: Model;
  onClose?: () => void;
};

export const MediaViewerRenderer: StatelessComponent<Props> = ({
  model,
  onClose,
}) => (
  <Blanket onClick={onClose}>
    {model.fileDetails.status === 'SUCCESSFUL' && (
      <Header>{model.fileDetails.data.name || 'No name given'}</Header>
    )}
    <Content>
      <Viewer model={model} />
    </Content>
  </Blanket>
);

export const Viewer: StatelessComponent<Props> = ({ model }) => {
  const { fileDetails, previewData } = model;

  switch (fileDetails.status) {
    case 'PENDING':
      return <Spinner />;
    case 'SUCCESSFUL':
      if (fileDetails.data.mediaType === 'unknown') {
        return <ErrorMessage>This file is unsupported</ErrorMessage>;
      }
      if (previewData.status === 'SUCCESSFUL') {
        return <FileViewer previewData={previewData.data} />;
      } else if (previewData.status === 'PENDING') {
        return <Spinner />;
      } else {
        return <ErrorMessage>Error rendering preview</ErrorMessage>;
      }
    case 'FAILED':
      return <ErrorMessage>Error</ErrorMessage>;
  }
};

export type FileViewerProps = {
  previewData: FilePreview;
};

export const FileViewer: StatelessComponent<FileViewerProps> = ({
  previewData,
}) => {
  switch (previewData.viewer) {
    case 'IMAGE':
      return <ImageViewer previewData={previewData} />;
    case 'VIDEO':
      return <VideoViewer previewData={previewData} />;
    case 'PDF':
      return <PDFViewer previewData={previewData} />;
  }
};
