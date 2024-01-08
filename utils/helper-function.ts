const totalAmount = (data: any) => {
  return (
    (data && data?.length && data?.reduce((acc: any, item: any) => acc + item.amount, 0)) || '0.00'
  );
};

export { totalAmount };
