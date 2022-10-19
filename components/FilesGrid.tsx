import prettyBytes from "pretty-bytes";

const FilesGrid: React.FC<{ filesSelected: File[] }> = ({ filesSelected }) => {
  if (filesSelected.length <= 0) {
    return <></>;
  }

  const fileToImgUrl = (file: File) => {
    return URL.createObjectURL(file);
  };

  return (
    <div className="bg-black opacity-75 w-3/4 rounded-md p-2 grid grid-cols-4">
      {filesSelected.map((file) => (
        <div key={file.name + file.lastModified} className="flex flex-col">
          <img src={fileToImgUrl(file)} className="w-40 h-40" />
          <h5 className="text-white text-xs">{file.name}</h5>
          <h5 className="text-white text-xs">
            ({prettyBytes(file.size).toUpperCase()})
          </h5>
        </div>
      ))}
    </div>
  );
};

export default FilesGrid;
