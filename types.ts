export interface ClassificationResult {
  mainCategory: string;
  confidence: number;
  tags: string[];
  description: string;
  detectedObjects: Array<{
    name: string;
    approximateLocation: string;
  }>;
  technicalDetails: {
    lighting: string;
    composition: string;
    colorPalette: string[];
  };
}

export interface HistoryItem {
  id: string;
  thumbnail: string;
  result: ClassificationResult;
  timestamp: number;
}
