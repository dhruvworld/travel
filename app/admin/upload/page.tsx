import ImageUpload from '@/components/admin/ImageUpload';

export default function UploadPage() {
  return (
    <div className="upload-page">
      <h1 className="text-xl font-semibold mb-4">Upload Images</h1>
      <ImageUpload 
        onUploadComplete={(imageUrl) => {
          console.log('Upload completed:', imageUrl);
        }}
      />
    </div>
  );
}