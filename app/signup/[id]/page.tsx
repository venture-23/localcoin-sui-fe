import MerchantSignup from 'container/CommonSIgnup';

export default function SignUpCommon({ params }: any) {
  return (
    <>
      <MerchantSignup param={params.id} />
    </>
  );
}
