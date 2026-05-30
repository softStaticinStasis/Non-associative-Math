/// Octonions (𝕆): 8-dimensional non-associative algebra

const std = @import("std");
const reals = @import("reals.zig");

pub const Octonion = struct {
    e: [8]reals.Real,

    pub fn new(
        e0: reals.Real, e1: reals.Real, e2: reals.Real, e3: reals.Real,
        e4: reals.Real, e5: reals.Real, e6: reals.Real, e7: reals.Real,
    ) Octonion {
        return .{ .e = [8]reals.Real{ e0, e1, e2, e3, e4, e5, e6, e7 } };
    }

    pub fn zero() Octonion {
        return new(0, 0, 0, 0, 0, 0, 0, 0);
    }
};

const OCTONION_MULT_TABLE = [8][8]i8{
    [8]i8{ 1, 1, 2, 3, 4, 5, 6, 7 },
    [8]i8{ 1, -1, 3, -2, 5, -4, -7, 6 },
    [8]i8{ 2, -3, -1, 1, 6, 7, -4, -5 },
    [8]i8{ 3, 2, -1, -1, 7, -6, 5, -4 },
    [8]i8{ 4, -5, -6, -7, -1, 1, 2, 3 },
    [8]i8{ 5, 4, -7, 6, -1, -1, -3, 2 },
    [8]i8{ 6, 7, 4, -5, -2, 3, -1, -1 },
    [8]i8{ 7, -6, 5, 4, -3, -2, 1, -1 },
};

pub const OctonionOps = struct {
    pub fn add(a: Octonion, b: Octonion) Octonion {
        var result: Octonion = undefined;
        for (0..8) |i| {
            result.e[i] = reals.RealOps.add(a.e[i], b.e[i]);
        }
        return result;
    }

    pub fn mul(a: Octonion, b: Octonion) Octonion {
        var result: [8]reals.Real = undefined;
        for (0..8) |i| result[i] = 0;

        for (0..8) |i| {
            for (0..8) |j| {
                const sign_mult = OCTONION_MULT_TABLE[i][j];
                const sign: reals.Real = if (sign_mult < 0) -1.0 else 1.0;
                const idx = @abs(sign_mult);
                result[@intCast(idx)] += sign * a.e[i] * b.e[j];
            }
        }

        return .{ .e = result };
    }

    pub fn norm_squared(a: Octonion) reals.Real {
        var sum: reals.Real = 0;
        for (0..8) |i| sum += a.e[i] * a.e[i];
        return sum;
    }
};
