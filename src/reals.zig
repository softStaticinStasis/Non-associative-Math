/// Reals (ℝ): Foundational numeric layer

const std = @import("std");

pub const Real = f64;

pub const RealOps = struct {
    pub fn add(a: Real, b: Real) Real { return a + b; }
    pub fn sub(a: Real, b: Real) Real { return a - b; }
    pub fn mul(a: Real, b: Real) Real { return a * b; }
    pub fn div(a: Real, b: Real) Real { return a / b; }
    pub fn conj(a: Real) Real { return a; }
    pub fn norm(a: Real) Real { return @abs(a); }
    pub fn norm_squared(a: Real) Real { return a * a; }
};
