import { useEffect, useRef } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
("mapbox-gl");
function Map() {
  const mapContainer = useRef(null);

  useEffect(() => {
    const apiUrl =
      "https://cristian-avendano.onrender.com/api/mapas?populate[image][fields][0]=url";

    fetch(apiUrl)
      .then((response) => response.json())
      .then((result) => {
        result.data.forEach((item) => {
          let linksHtml = "";
          item.attributes.links.forEach((link) => {
            linksHtml += `
              <a class="text-white border rounded-lg py-2 px-4 w-fit border-gray-200 hover:text-[#ecf387] hover:border-[#ecf387]" href="${link.url}" target="_blank" >${link.red}</a>
            `;
          });
          new mapboxgl.Marker({ color: "#113444" })
            .setLngLat([item.attributes.long, item.attributes.lat])
            .setPopup(
              new mapboxgl.Popup({ offset: 25 }).setHTML(`
                <div class="py-4 px-2 rounded-lg w-fit flex flex-col gap-4">
                    <h2 class="lg:text-xl font-semibold text-center capitalize">${item.attributes.title} <span class="text-gray-200">(${item.attributes.city})</span></h2>
                    <a href="http://localhost:4321/blog/${item.attributes.slug}">
                      <img class="w-full h-full max-w-60 object-cover block rounded-xl mx-auto" src="${item.attributes.image.data[0].attributes.url}" alt=${item.attributes.title}>	
                    </a>
                    <div class="mb-4">
                      <p class="text-sm lg:text-md text-pretty max-w-xs text-justify line-clamp-3">
                        ${item.attributes.description}
                      </p>
                      <span class="font-bold"><a href="http://localhost:4321/blog/${item.attributes.slug}">ver más</a></span>
                    </div>
                  
                    <div>${linksHtml}</div>
                </div>
            `)
            )
            .addTo(map);
        });

        
      })
      .catch((error) => console.error("Error:", error));

    mapboxgl.accessToken =
      "pk.eyJ1IjoiZGVpYnlwZW5hIiwiYSI6ImNsdzB4andkNDA1d20ybHJrZG5wN29keDAifQ.n_aXTvs3JISyyhz2tGEjkw";
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      zoom: 1,
      maxBounds: [
        [-73.5, 6.2],
        [-72.5, 7.5],
      ],
    });

    

    return () => map.remove();
  }, []);

  return (
    <div
      className="relative min-h-[80vh] cursor-grab rounded-xl"
      ref={mapContainer}
    />
  );
}

export default Map;
