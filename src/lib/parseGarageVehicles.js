function normalizeVehicle(entry) {
  if (!entry || typeof entry !== "object") return null;

  const year = entry.year ?? entry.vehicleYear ?? entry.modelYear;
  const make = entry.make ?? entry.vehicleMake ?? entry.manufacturer;
  const model = entry.model ?? entry.vehicleModel;

  if (year == null || !make || !model) return null;

  return {
    year: String(year),
    make: String(make),
    model: String(model),
    submodel: String(
      entry.submodel ?? entry.subModel ?? entry.vehicleSubmodel ?? "",
    ).trim(),
    engine: String(entry.engine ?? entry.vehicleEngine ?? "").trim(),
  };
}

/**
 * Extract garage / recent search vehicles from UserSessionResponse (flexible field names).
 */
export function parseGarageVehicles(session) {
  if (!session || typeof session !== "object") return [];

  const candidates = [
    session.vehicles,
    session.recentVehicles,
    session.garage,
    session.garageVehicles,
    session.searchedVehicles,
    session.vehicleHistory,
    session.recentSearches,
    session.data?.vehicles,
    session.data?.recentVehicles,
  ];

  let raw = [];
  for (const candidate of candidates) {
    if (Array.isArray(candidate) && candidate.length > 0) {
      raw = candidate;
      break;
    }
  }

  const seen = new Set();
  const result = [];

  for (const entry of raw) {
    const vehicle = normalizeVehicle(entry);
    if (!vehicle) continue;

    const key = [
      vehicle.year,
      vehicle.make,
      vehicle.model,
      vehicle.submodel,
      vehicle.engine,
    ].join("|");

    if (seen.has(key)) continue;
    seen.add(key);
    result.push(vehicle);
  }

  return result;
}

export function vehicleToLabel(vehicle) {
  return [
    vehicle.year,
    vehicle.make,
    vehicle.model,
    vehicle.submodel,
    vehicle.engine,
  ]
    .filter(Boolean)
    .join(" ");
}

export function vehicleToSearchParams(vehicle) {
  const params = new URLSearchParams({
    year: vehicle.year,
    make: vehicle.make,
    model: vehicle.model,
  });
  if (vehicle.submodel) params.set("submodel", vehicle.submodel);
  if (vehicle.engine) params.set("engine", vehicle.engine);
  return params;
}

export function vehicleToKey(vehicle) {
  return [
    vehicle.year,
    vehicle.make,
    vehicle.model,
    vehicle.submodel,
    vehicle.engine,
  ].join("|");
}

/** Body for DELETE /garage/vehicle (DeleteVehicleRequest). */
export function vehicleToDeletePayload(vehicle) {
  const year = Number.parseInt(String(vehicle.year), 10);
  return {
    make: vehicle.make,
    model: vehicle.model,
    year: Number.isNaN(year) ? null : year,
    engine: vehicle.engine || "",
  };
}
