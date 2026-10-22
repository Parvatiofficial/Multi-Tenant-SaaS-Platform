export enum DocumentStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  READY = 'READY',
  FAILED = 'FAILED',
}

export interface DocumentMetadata {
  id: string;
  tenantId: string;
  title: string;
  fileKey: string;
  fileSize: number;
  mimeType: string;
  status: DocumentStatus;
  createdAt: string;
  updatedAt: string;
}

export interface DocumentChunkSearchResult {
  chunkId: string;
  documentId: string;
  documentTitle: string;
  content: string;
  pageNumber?: number;
  score: number;
}
