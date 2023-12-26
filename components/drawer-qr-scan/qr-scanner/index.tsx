'use client';
import {
  ArrowDownOnSquareStackIcon,
  QrCodeIcon,
  ShareIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';
import Button from 'components/botton';
import PopupBox from 'components/popover';
import { useMyContext } from 'hooks/useMyContext';
import Link from 'next/link';
import QRCode from 'qrcode';
import { useEffect, useRef, useState } from 'react';
import { QrReader } from 'react-qr-reader';

export default function ScanPayMerchant({ closeScanner, setScanData, shareQr }: any) {
  const [imageUrl, setImageUrl] = useState('');
  const [getScanedResult, setGetScanedResult] = useState(false);
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const cameraRef = useRef();
  const ref = useRef(null);
  const lastResult = useRef();
  const { userInfo } = useMyContext();

  const [delayScan, setDelayScan] = useState(500);
  const popOverRef = useRef<any>(null);

  useEffect(() => {
    if (shareQr) {
      generateQrCode();
    }
  }, [shareQr]);
  const generateQrCode = async () => {
    try {
      const staticData = {
        type: userInfo.userType,
        publicKey: userInfo.publicKey
      };
      const response = await QRCode.toDataURL(JSON.stringify(staticData));
      setImageUrl(response);
    } catch (error) {
      console.log(error);
    }
  };
  const handleErrorWebCam = (error: any) => {
    console.log(error);
  };
  const handleScanWebCam = (result: string) => {
    if (result) {
      setScanData(result);
      setGetScanedResult(true);
      closeScanner();
      close();
      console.log({ result });
    }
  };
  async function close() {
    console.log('closing');
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: true
    });
    console.log({ stream });
    stream.getTracks().forEach(function (track) {
      track.stop();
      track.enabled = false;
    });
    cameraRef?.current?.remove();
  }
  return (
    <>
      {/* <Header className="h-[120px]"> */}
      <div className=" absolute top-12 z-[10] mx-auto w-[95%] ">
        <div className="flex items-center justify-between">
          <p className="flex-1 text-center text-white">Scan QR code to pay</p>
          <div onClick={() => closeScanner()}>
            <XCircleIcon width={24} height={24} color="white" />
          </div>
        </div>
      </div>
      {/* </Header> */}
      {(!getScanedResult && (
        <QrReader
          scanDelay={delayScan}
          constraints={{
            facingMode: 'environment'
          }}
          onResult={(result, error) => {
            if (!result) return;

            // This callback will keep existing even after
            // this component is unmounted
            // So ignore it (only in this reference) if result keeps repeating
            if (lastResult.current === result.text) {
              return;
            }
            setScanData(result.text);
            setGetScanedResult(true);
            closeScanner();
            close();
            lastResult.current = result.text;
            if (!!error) {
              handleErrorWebCam(error);
            }
            // onResult(result.text);
          }}
          /*  onResult={(result, error) => {
              if (!!result) {
                handleScanWebCam(result?.text);
                setDelayScan(false);
              }

              if (!!error) {
                handleErrorWebCam(error);
              }
            }} */
          containerStyle={{ paddingTop: '0' }}
          videoContainerStyle={{ width: '100%', height: '100vh', paddingTop: '0' }}
          videoStyle={{
            height: '100%',
            width: '100%',
            objectFit: 'cover'
          }}
        />
      )) ||
        null}

      <span
        className="try-css bg-tranparent absolute inset-0 m-auto h-[200px] w-1/2 rounded-md border-2 border-white  
        shadow-[0_4px_0px_500px_rgba(0,0,0,0.5)] "
      ></span>

      {/* <span className="absolute inset-0 w-full h-full font-bold bg-black/5"></span> */}
      {/* <h3>Scanned By WebCam Code: {scanResultWebCam}</h3> */}
      {/* {imageUrl ? <img src={imageUrl} alt="img" style={{ width: '100%' }} /> : null} */}

      {imageUrl ? (
        <>
          <div
            className="fixed bottom-7 right-7 "
            onClick={() => popOverRef.current.open({ title: 'Share QR Code', imageUrl })}
          >
            <Link
              href=""
              className="flex w-fit items-center gap-2 rounded-full bg-blue-500 px-6 py-3"
            >
              <QrCodeIcon className="h-6 w-6 text-white" />
              <span className="text-base font-semibold text-white">Share QR asd</span>
            </Link>
          </div>
          <PopupBox ref={popOverRef}>
            <a href={imageUrl} download className="w-full">
              <Button
                buttonIcon={<ArrowDownOnSquareStackIcon width={24} height={24} />}
                text="Save image"
              />
            </a>
            <Button
              text="Share"
              buttonType="secondary"
              buttonIcon={<ShareIcon width={24} height={24} />}
            />
          </PopupBox>
        </>
      ) : null}
    </>
  );
}
