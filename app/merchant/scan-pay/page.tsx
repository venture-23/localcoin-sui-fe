'use client';
import { useRouter } from 'next/navigation';
import QRCode from 'qrcode';
import { useEffect, useState } from 'react';
import { QrReader } from 'react-qr-reader';

import BottomSheet from 'components/bottomsheet';
import Link from 'next/link';
import Drawer from 'components/drawer';
export default function ScanPayMerchant() {
  const [imageUrl, setImageUrl] = useState('');
  // const [scanResultFile, setScanResultFile] = useState('');
  const [scanResultWebCam, setScanResultWebCam] = useState('');
  const { push } = useRouter();

  useEffect(() => {
    generateQrCode();
  }, []);

  const generateQrCode = async () => {
    try {
      const response = await QRCode.toDataURL('this is address of user');
      setImageUrl(response);
    } catch (error) {
      console.log(error);
    }
  };
  // const handleErrorFile = (error) => {
  //   console.log(error);
  // };
  // const handleScanFile = (result) => {
  //   if (result) {
  //     setScanResultFile(result);
  //   }
  // };
  // const onScanFile = () => {
  //   console.log(qrRef.current, 'current');
  //   qrRef.current.openImageDialog();
  // };
  const handleErrorWebCam = (error: any) => {
    console.log(error);
  };
  const handleScanWebCam = (result: string) => {
    if (result) {
      setScanResultWebCam('result');
      push('/merchant/confirmation');
    }
  };

  return (
    <>
      {/* <Header className="h-[120px]"> */}
      {/* <div className=" absolute top-12 z-[10] mx-auto w-[95%] ">
        <div className="flex   items-center justify-between">
          <p className="flex-1 text-center">Scan QR code to pay</p>
          <Link href="/merchant" className="">
            {'X'}
          </Link>
        </div>
      </div> */}
      {/* </Header> */}
      {/* <QrReader
        onResult={(result, error) => {
          if (!!result) {
            handleScanWebCam(result?.text);
          }

          if (!!error) {
            handleErrorWebCam(error);
          }
        }}
        scanDelay={300}
        style={{ width: '100%', height: '100%' }}
      /> */}
      {/* <h3>Scanned By WebCam Code: {scanResultWebCam}</h3> */}
      {/* {imageUrl ? <img src={imageUrl} alt="img" style={{ width: '100%' }} /> : null} */}
      {imageUrl ? (
        <>
          {/* <BottomSheet divClass="!h-[100vh]">
            <div className="container mx-auto">
              <p className="pt-4 text-center "> Swipe or click to share QR code </p>
              <img src={imageUrl} alt="img" style={{ width: '100%' }} />
            </div>
          </BottomSheet> */}
          {/* <Drawer /> */}
        </>
      ) : null}
    </>
  );
}
