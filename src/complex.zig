/// Complex Numbers (ℂ): 2-dimensional algebra

const std = @import("std");
const reals = @import("reals.zig");

pub const Complex = struct {
    real: reals.Real,
    imag: reals.Real,

    pub fn new(real: reals.Real, imag: reals.Real) Complex {
        return .{ .real = real, .imag = imag };
    }
};

pub const ComplexOps = struct {
    pub fn add(a: Complex, b: Complex) Complex {
        return .{
            .real = reals.RealOps.add(a.real, b.real),
            .imag = reals.RealOps.add(a.imag, b.imag),
        };
    }

    pub fn sub(a: Complex, b: Complex) Complex {
        return .{
            .real = reals.RealOps.sub(a.real, b.real),
            .imag = reals.RealOps.sub(a.imag, b.imag),
        };
    }

    pub fn mul(a: Complex, b: Complex) Complex {
        return .{
            .real = reals.RealOps.sub(
                reals.RealOps.mul(a.real, b.real),
                reals.RealOps.mul(a.imag, b.imag),
            ),
            .imag = reals.RealOps.add(
                reals.RealOps.mul(a.real, b.imag),
                reals.RealOps.mul(a.imag, b.real),
            ),
        };
    }

    pub fn conj(a: Complex) Complex {
        return .{ .real = a.real, .imag = -a.imag };
    }

    pub fn norm(a: Complex) reals.Real {
        return @sqrt(norm_squared(a));
    }

    pub fn norm_squared(a: Complex) reals.Real {
        return reals.RealOps.add(
            reals.RealOps.mul(a.real, a.real),
            reals.RealOps.mul(a.imag, a.imag),
        );
    }
};
