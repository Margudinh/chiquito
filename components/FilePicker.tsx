import React, { useRef, useState } from "react";
import FilesGrid from "./FilesGrid";
import axios, { AxiosRequestConfig } from "axios";
import { useAtom } from "jotai";
import { CompressResults, compressResultsAtom } from "./store/compress-results";
import CompressResultsContainer from "./CompressResultsContainer";

const FilePicker: React.FC<any> = () => {
  const fileRef = useRef<null | HTMLInputElement>(null);
  const formRef = useRef<null | HTMLFormElement>(null);
  const [filesSelected, setFilesSelected] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [compressResults, setCompressResults] = useAtom(compressResultsAtom);

  const handleClick = () => {
    if (fileRef !== null) {
      fileRef.current?.click();
    }
  };

  const handleFileSelect = async () => {
    if (fileRef !== null && fileRef.current && fileRef.current.files) {
      const files = Array.from(fileRef.current.files);
      setFilesSelected(files);
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      const config: AxiosRequestConfig<FormData> = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      setIsSubmitting(true);
      const result = await axios.post<CompressResults>(
        "/api/compress-images",
        formData,
        config
      );
      setCompressResults(result.data);
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="flex items-center justify-center min-h-screen flex-col gap-3"
    >
      <FilesGrid filesSelected={filesSelected} />
      <input
        ref={fileRef}
        type="file"
        multiple
        className="hidden"
        accept="image/jpeg,image/png,image/jpg"
        name="files"
        onChange={handleFileSelect}
      />

      <div className="flex gap-4 w-3/4 ">
        <button
          type="button"
          className="bg-black text-white py-3 rounded-lg uppercase flex-grow"
          onClick={handleClick}
        >
          SELECT YOUR FILES
        </button>
        {filesSelected.length > 0 && (
          <button
            disabled={isSubmitting}
            type="submit"
            className="bg-blue-600 text-white py-3 rounded-lg uppercase flex-grow disabled:bg-blue-500 hover:bg-blue-700"
          >
            COMPRESS
          </button>
        )}
      </div>
      <CompressResultsContainer />
    </form>
  );
};

export default FilePicker;
