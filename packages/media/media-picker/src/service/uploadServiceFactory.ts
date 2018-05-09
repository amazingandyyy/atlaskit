import {
  UploadEndEventPayload,
  UploadErrorEventPayload,
  UploadPreviewUpdateEventPayload,
  UploadProcessingEventPayload,
  UploadsStartEventPayload,
  UploadStatusUpdateEventPayload,
  UploadParams,
} from '..';
import { NewUploadServiceImpl } from './newUploadServiceImpl';
import { OldUploadServiceImpl } from './uploadService';
import { Context } from '../../../media-core';

export type UploadServiceEventPayloadTypes = {
  readonly 'files-added': UploadsStartEventPayload;
  readonly 'file-preview-update': UploadPreviewUpdateEventPayload;
  readonly 'file-uploading': UploadStatusUpdateEventPayload;
  readonly 'file-converting': UploadProcessingEventPayload;
  readonly 'file-converted': UploadEndEventPayload;
  readonly 'file-upload-error': UploadErrorEventPayload;
  readonly 'file-dropped': DragEvent;
};

export type UploadServiceEventListener<
  E extends keyof UploadServiceEventPayloadTypes
> = (payload: UploadServiceEventPayloadTypes[E]) => void;

export const MAX_FILE_SIZE_FOR_PREVIEW = 10e6; // 10 MB

export interface UploadService {
  setUploadParams(uploadParams?: UploadParams);
  addBrowse(element: HTMLInputElement);
  addDropzone(element: HTMLElement);
  removeDropzone();
  removeBrowse();
  addFiles(files: File[]);
  cancel(id?: string);
  on<E extends keyof UploadServiceEventPayloadTypes>(
    event: E,
    listener: UploadServiceEventListener<E>,
  );
  off<E extends keyof UploadServiceEventPayloadTypes>(
    event: E,
    listener: UploadServiceEventListener<E>,
  );
}

export class UploadServiceFactory {
  public static create(
    context: Context,
    uploadParams?: UploadParams,
    useOldUploadService: boolean = false,
  ): UploadService {
    if (useOldUploadService) {
      return new OldUploadServiceImpl(context, uploadParams);
    } else {
      return new NewUploadServiceImpl(context, uploadParams);
    }
  }
}
