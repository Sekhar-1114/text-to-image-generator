
import { AspectRatio, AspectRatioOption } from './types';

export const IMAGE_MODEL_NAME = 'imagen-3.0-generate-002';

export const ASPECT_RATIO_OPTIONS: AspectRatioOption[] = [
  { value: AspectRatio.SQUARE, label: 'Square (1:1)' },
  { value: AspectRatio.LANDSCAPE, label: 'Landscape (16:9)' },
  { value: AspectRatio.PORTRAIT, label: 'Portrait (9:16)' },
  { value: AspectRatio.WIDE, label: 'Wide (4:3)' },
  { value: AspectRatio.TALL, label: 'Tall (3:4)' },
];
