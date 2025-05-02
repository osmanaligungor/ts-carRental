import { ICar } from "../types";

type FetchCarsReturn = {
  total_count: number;
  results: ICar[];
};

// * Asenkron fonksiyonların return tipine doğrudan fonksiyonun return ettiği veriyi yazdığımızda hata alırız. Fonksiyonların hata döndürme ihtimalini de göze alarak ts'in içerisinde bulunan Promise tipine kendi tipimizi generic olarak göndermeliyiz.

export const fetchCars = async (): Promise<FetchCarsReturn> => {
  const url = `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/all-vehicles-model/records?limit=20&refine=make:BMW`;

  const res = await fetch(url);

  const data = await res.json();

  return data;
};
