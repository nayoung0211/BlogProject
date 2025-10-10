// @ts-ignore
import type { ReportHandler } from 'web-vitals';

const reportWebVitals = (onPerfEntry?: ReportHandler) => {
  if (onPerfEntry && typeof onPerfEntry === 'function') {
    import('web-vitals').then((wv: any) => {
      wv.getCLS(onPerfEntry);
      wv.getFID(onPerfEntry);
      wv.getFCP(onPerfEntry);
      wv.getLCP(onPerfEntry);
      if (wv.getTTFB) wv.getTTFB(onPerfEntry); // 존재하면 호출
    });
  }
};

export default reportWebVitals;
