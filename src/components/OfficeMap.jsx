import { useEffect, useRef } from "react";
import { motionDisabled } from "../utils/accessibilityPreferences";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

function OfficeMap({ lat, lng, label }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    if (map.current) return undefined;
    if (!mapContainer.current) return undefined;

    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;
    const touchDevice = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    const reducedMotion = motionDisabled();

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: 17.4,
      performanceMetricsCollection: false,
      ...(touchDevice ? { cooperativeGestures: true } : {}),
    });

    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");
    const resizeObserver = touchDevice && typeof ResizeObserver === "function"
      ? new ResizeObserver(() => map.current?.resize())
      : null;
    resizeObserver?.observe(mapContainer.current);

    markerRef.current = new mapboxgl.Marker({ color: "#c1121f" })
      .setLngLat([lng, lat])
      .setPopup(
        new mapboxgl.Popup({ offset: 25, focusAfterOpen: false }).setHTML(
          `<strong>${label}</strong>`
        )
      )
      .addTo(map.current);

    map.current.on("load", () => {
      map.current.flyTo({
        center: [lng, lat],
        zoom: 17.6,
        animate: !touchDevice && !reducedMotion && !motionDisabled(),
        essential: !touchDevice && !reducedMotion && !motionDisabled(),
      });
    });

    const stopMotion = () => { if (motionDisabled()) map.current?.stop(); };
    window.addEventListener("accessibilitychange", stopMotion);
    return () => {
      window.removeEventListener("accessibilitychange", stopMotion);
      resizeObserver?.disconnect();
      markerRef.current?.remove();
      map.current?.remove();
      markerRef.current = null;
      map.current = null;
    };
  }, [lat, lng, label]);

  useEffect(() => {
    if (!map.current || !markerRef.current) return;

    markerRef.current.setLngLat([lng, lat]);
    map.current.flyTo({
      center: [lng, lat],
      zoom: 17.6,
      animate: !motionDisabled() && !window.matchMedia("(hover: none) and (pointer: coarse)").matches,
      essential: !motionDisabled() && !window.matchMedia("(hover: none) and (pointer: coarse)").matches,
    });
  }, [lat, lng]);

  return <div ref={mapContainer} className="mapbox-canvas" />;
}

export default OfficeMap;
