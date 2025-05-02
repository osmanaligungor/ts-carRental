import { ICar } from "../types";

type ReturnType = [string, string | number | null][]; // Tuple

// car nesnesindeki verilerin sadece ihtiyacımız olan kısmını filtreleyip diziye çevirip return eden fonksiyon
const formatData = (car: ICar): ReturnType => {
  // kabul ettiğimiz değerler
  const accepted = [
    "make",
    "model",
    "cylinders",
    "drive",
    "fueltype",
    "trany",
    "vclass",
    "year",
    "startstop",
    "co2",
    "displ",
    "atvtype",
  ];

  // diziye çevirme ve filtreleme
  const arrData = Object.entries(car).filter((car) =>
    accepted.includes(car[0])
  );
  // döndürülen değer
  return arrData;
};

export default formatData;
