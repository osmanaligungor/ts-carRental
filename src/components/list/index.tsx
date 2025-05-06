import { FC, useEffect, useState } from "react";
import { fetchCars } from "../../utils/service";
import { ICar } from "../../types";
import Warning from "./warning";
import Card from "./card";
import { useSearchParams } from "react-router-dom";
import ReactPaginate from "react-paginate";

const List: FC = () => {
  const [params, setParams] = useSearchParams();
  const [cars, setCars] = useState<ICar[] | null>(null);
  const [total, setTotal] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  // urldeki arama parametrelerini nesne haline getir
  const paramsObj = Object.fromEntries(params.entries());

  useEffect(() => {
    fetchCars(paramsObj)
      .then((data) => {
        setCars(data.results);
        setTotal(data.total_count);
      })
      .catch((err) => setError(err));
  }, [params]);

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

      {total && (
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          previousLabel="<"
          containerClassName="pagination"
          initialPage={Number(params.get("page") || 1) - 1}
          onPageChange={(e) => {
            // sayfa parametresini güncelle
            params.set("page", String(e.selected + 1));
            setParams(params);
            // yukarıya scrolla
            document.querySelector("#filter")?.scrollIntoView();
          }}
          pageCount={Math.ceil(total / 10)}
          renderOnZeroPageCount={null}
        />
      )}
    </div>
  );
};

export default List;
