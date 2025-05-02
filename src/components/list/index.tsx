import { FC, useEffect, useState } from "react";
import { fetchCars } from "../../utils/service";
import { ICar } from "../../types";
import Warning from "./warning";
import Card from "./card";

const List: FC = () => {
  const [cars, setCars] = useState<ICar[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCars()
      .then((data) => setCars(data.results))
      .catch((err) => setError(err));
  }, []);

  // 1) cars null ise > henüz api'dan cevap gelmemiştir
  if (!cars) return <Warning>Yükleniyor...</Warning>;

  // 2) error dolu ise > api'dan hatalı cevap gelmistir
  if (error) return <Warning>Hata Mesajı</Warning>;

  // 3) cars boş dizi ise > aranılan kritere uygun veri yoktur
  if (cars.length < 1) return <Warning>Veri Bulunamadı</Warning>;

  // 4) cars dolu ise > api'dan veriler gelmiştir
  return (
    <div className="padding-x max-width">
      <section className="home-cars-wrapper">
        {cars.map((car, i) => (
          <Card key={i} car={car} />
        ))}
      </section>
    </div>
  );
};

export default List;
