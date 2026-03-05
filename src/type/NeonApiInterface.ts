import { Request, Response } from "express";
export type geminiApiResponse = Response<geminiResponse>;

export type geminiRequest = {
  title: string;
  description: string;
  accessToken: string;
};
export type geminiApiRequest = Request<geminiRequest>;
export type geminiResponse =
  | {
      result: jsonResponse;
      status: number;
    }
  | { error: string; status: number };
export type jsonResponse = {
  catalog_number: string | null;
  matrix_number: string | null;
  artist: string | null;
  title: string | null;
  format: string | null;
  country: string | null;
  year: number | null;
  confidence: number;
};
export type discogsData = {
  resourceId: string;
  lowest: number | null;
  median: number | null;
  highest: number | null;
};

export type discogsDataApiResponse = Response<discogsDataResponse>;

export type discogsDataRequest = {
  resourceIds: string[];
  accessToken: string;
};
export type discogsDataApiRequest = Request<discogsDataRequest>;
export type discogsDataResponse =
  | {
      result: discogsData[];
      status: number;
    }
  | { error: string; status: number };
