import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import path from "path";
import fs from "fs/promises";
import { existsSync } from "fs";

const api = nextConnect<NextApiRequest, NextApiResponse>();

api.get(async (req, res) => {
  const hash = req.query.hash as string;
  const zipDest = path.join("./.tmp", `${hash}.zip`);

  if (existsSync(zipDest)) {
    const zipBuffer = await fs.readFile(zipDest);

    res.setHeader("Content-Type", "application/zip");
    res.setHeader("Content-Disposition", "attachment; filename=chiquito.zip");
    res.setHeader("Content-Length", zipBuffer.length);

    await fs.unlink(zipDest);
    res.status(200).send(zipBuffer);
  } else {
    res.status(404).end();
  }
});

export default api;
