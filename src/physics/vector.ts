export interface Vec2 {
  readonly x: number;
  readonly y: number;
}

export interface Vec3 {
  readonly x: number;
  readonly y: number;
  readonly z: number;
}

export interface PolarCoordinate {
  readonly r: number;
  readonly thetaRadians: number;
}

function assertFiniteComponents(values: readonly number[], label: string): void {
  for (const value of values) {
    if (!Number.isFinite(value)) {
      throw new RangeError(`${label} components must be finite.`);
    }
  }
}

export function add2(a: Vec2, b: Vec2): Vec2 {
  assertFiniteComponents([a.x, a.y, b.x, b.y], "Vec2");
  return { x: a.x + b.x, y: a.y + b.y };
}

export function sub2(a: Vec2, b: Vec2): Vec2 {
  assertFiniteComponents([a.x, a.y, b.x, b.y], "Vec2");
  return { x: a.x - b.x, y: a.y - b.y };
}

export function scale2(vector: Vec2, scalar: number): Vec2 {
  assertFiniteComponents([vector.x, vector.y, scalar], "Vec2");
  return { x: vector.x * scalar, y: vector.y * scalar };
}

export function dot2(a: Vec2, b: Vec2): number {
  assertFiniteComponents([a.x, a.y, b.x, b.y], "Vec2");

  // Euclidean dot product; components use the same unit basis.
  return a.x * b.x + a.y * b.y;
}

export function norm2(vector: Vec2): number {
  assertFiniteComponents([vector.x, vector.y], "Vec2");

  // Euclidean norm with the same unit as the vector components.
  return Math.hypot(vector.x, vector.y);
}

export function normalize2(vector: Vec2): Vec2 {
  const magnitude = norm2(vector);

  if (magnitude === 0) {
    throw new RangeError("Cannot normalize a zero vector.");
  }

  return scale2(vector, 1 / magnitude);
}

export function add3(a: Vec3, b: Vec3): Vec3 {
  assertFiniteComponents([a.x, a.y, a.z, b.x, b.y, b.z], "Vec3");
  return { x: a.x + b.x, y: a.y + b.y, z: a.z + b.z };
}

export function sub3(a: Vec3, b: Vec3): Vec3 {
  assertFiniteComponents([a.x, a.y, a.z, b.x, b.y, b.z], "Vec3");
  return { x: a.x - b.x, y: a.y - b.y, z: a.z - b.z };
}

export function scale3(vector: Vec3, scalar: number): Vec3 {
  assertFiniteComponents([vector.x, vector.y, vector.z, scalar], "Vec3");
  return {
    x: vector.x * scalar,
    y: vector.y * scalar,
    z: vector.z * scalar
  };
}

export function dot3(a: Vec3, b: Vec3): number {
  assertFiniteComponents([a.x, a.y, a.z, b.x, b.y, b.z], "Vec3");
  return a.x * b.x + a.y * b.y + a.z * b.z;
}

export function norm3(vector: Vec3): number {
  assertFiniteComponents([vector.x, vector.y, vector.z], "Vec3");
  return Math.hypot(vector.x, vector.y, vector.z);
}

export function normalize3(vector: Vec3): Vec3 {
  const magnitude = norm3(vector);

  if (magnitude === 0) {
    throw new RangeError("Cannot normalize a zero vector.");
  }

  return scale3(vector, 1 / magnitude);
}

export function normalizeAngleRadians(thetaRadians: number): number {
  if (!Number.isFinite(thetaRadians)) {
    throw new RangeError("thetaRadians must be finite.");
  }

  const twoPi = 2 * Math.PI;
  return ((thetaRadians % twoPi) + twoPi) % twoPi;
}

export function cartesianToPolar(vector: Vec2): PolarCoordinate {
  assertFiniteComponents([vector.x, vector.y], "Vec2");

  return {
    r: norm2(vector),
    thetaRadians: normalizeAngleRadians(Math.atan2(vector.y, vector.x))
  };
}

export function polarToCartesian(polar: PolarCoordinate): Vec2 {
  assertFiniteComponents([polar.r, polar.thetaRadians], "PolarCoordinate");

  if (polar.r < 0) {
    throw new RangeError("Polar radius must be non-negative.");
  }

  return {
    x: polar.r * Math.cos(polar.thetaRadians),
    y: polar.r * Math.sin(polar.thetaRadians)
  };
}
