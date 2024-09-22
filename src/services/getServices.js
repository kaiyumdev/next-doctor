export const getServices = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/services/api/get-all`
  );
  const services = res.json();
  return services;
};

export const getServicesDetails = async (id) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/services/api/${id}`
  );
  const service = res.json();
  return service;
};
