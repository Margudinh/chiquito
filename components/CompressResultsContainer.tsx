import { useAtom } from "jotai";
import { compressResultsAtom } from "./store/compress-results";
import prettyBytes from "pretty-bytes";
import axios from "axios";

const CompressResultsContainer = () => {
  const [cr, setCompressResults] = useAtom(compressResultsAtom);

  if (!cr) {
    return <></>;
  }

  const reducedPercentage = Math.round(
    ((cr.originalSize - cr?.improvedSize) / cr.originalSize) * 100
  );

  // const onDownload = async () => {
  //   await axios.get("/api/download-zip", {
  //     params: {
  //       hash: cr.zipHash,
  //     },
  //   });
  // };

  return (
    <div className="bg-black opacity-75 w-3/4 rounded-md p-2 grid grid-cols-4">
      <div className="flex flex-col justify-center items-center">
        <h5 className="text-white text-sm">Original File size</h5>
        <h3 className="text-white text-lg">
          {prettyBytes(cr.originalSize).toUpperCase()}
        </h3>
      </div>

      <div className="flex flex-col justify-center items-center">
        <h5 className="text-white text-sm">Improved File Size</h5>
        <h3 className="text-white text-lg">
          {prettyBytes(cr.improvedSize).toUpperCase()}
        </h3>
      </div>

      <div className="flex flex-col justify-center items-center">
        <h5 className="text-white text-sm">Reduced Space</h5>
        <h3 className="text-white text-lg">{reducedPercentage}%</h3>
      </div>

      <div className="flex flex-col">
        <a
          href={`/api/download-zip?hash=${cr.zipHash}`}
          className="bg-blue-600 text-white text-center py-3 rounded-lg uppercase flex-grow disabled:bg-blue-500 hover:bg-blue-700"
        >
          Download
        </a>
      </div>
    </div>
  );
};

export default CompressResultsContainer;
