/// Clifford Algebra Cl(6) over Complex Octonions

const std = @import("std");
const reals = @import("reals.zig");
const octonions = @import("octonions.zig");

pub const Grade = u3;
pub const BladeMask = u6;

pub const Blade = struct {
    mask: BladeMask,
    grade: Grade,

    pub fn new(mask: BladeMask) Blade {
        return .{
            .mask = mask,
            .grade = @popCount(mask),
        };
    }
};

pub const CxOctCoeff = struct {
    real_octonian: octonions.Octonion,
    imag_octonian: octonions.Octonion,

    pub fn zero() CxOctCoeff {
        return .{
            .real_octonian = octonions.Octonion.zero(),
            .imag_octonian = octonions.Octonion.zero(),
        };
    }
};

pub const Multivector = struct {
    coefficients: [64]CxOctCoeff,

    pub fn zero() Multivector {
        var mv: Multivector = undefined;
        for (0..64) |i| {
            mv.coefficients[i] = CxOctCoeff.zero();
        }
        return mv;
    }
};
