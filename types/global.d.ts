// Add this to your existing global.d.ts file or create a new one
interface File {
  readonly lastModified: number;
  readonly name: string;
  readonly size: number;
  readonly type: string;
  readonly webkitRelativePath: string;
  slice(start?: number, end?: number, contentType?: string): Blob;
  arrayBuffer(): Promise<ArrayBuffer>;
  text(): Promise<string>;
}
