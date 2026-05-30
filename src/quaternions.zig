/// Quaternions (ℋ): 4-dimensional non-commutative algebra

const std = @import("std");
const reals = @import("reals.zig");
const complex = @import("complex.zig");

pub const Quaternion = struct {
    w: reals.Real,
    x: reals.Real,
    y: reals.Real,
    z: reals.Real,

    pub fn new(w: reals.Real, x: reals.Real, y: reals.Real, z: reals.Real) Quaternion {
        return .{ .w = w, .x = x, .y = y, .z = z };
    }
};

pub const QuaternionOps = struct {
    pub fn add(a: Quaternion, b: Quaternion) Quaternion {
        return .{
            .w = reals.RealOps.add(a.w, b.w),
            .x = reals.RealOps.add(a.x, b.x),
            .y = reals.RealOps.add(a.y, b.y),
            .z = reals.RealOps.add(a.z, b.z),
        };
    }

    pub fn mul(a: Quaternion, b: Quaternion) Quaternion {
        return .{
            .w = reals.RealOps.sub(
                reals.RealOps.sub(
                    reals.RealOps.sub(
                        reals.RealOps.mul(a.w, b.w),
                        reals.RealOps.mul(a.x, b.x)
                    ),
                    reals.RealOps.mul(a.y, b.y)
                ),
                reals.RealOps.mul(a.z, b.z)
            ),
            .x = reals.RealOps.add(
                reals.RealOps.add(
                    reals.RealOps.mul(a.w, b.x),
                    reals.RealOps.mul(a.x, b.w)
                ),
                reals.RealOps.sub(
                    reals.RealOps.mul(a.y, b.z),
                    reals.RealOps.mul(a.z, b.y)
                ),
            ),
            .y = reals.RealOps.add(
                reals.RealOps.add(
                    reals.RealOps.mul(a.w, b.y),
                    reals.RealOps.mul(a.y, b.w)
                ),
                reals.RealOps.sub(
                    reals.RealOps.mul(a.z, b.x),
                    reals.RealOps.mul(a.x, b.z)
                ),
            ),
            .z = reals.RealOps.add(
                reals.RealOps.add(
                    reals.RealOps.mul(a.w, b.z),
                    reals.RealOps.mul(a.z, b.w)
                ),
                reals.RealOps.sub(
                    reals.RealOps.mul(a.x, b.y),
                    reals.RealOps.mul(a.y, b.x)
                ),
            ),
        };
    }

    pub fn norm_squared(a: Quaternion) reals.Real {
        return reals.RealOps.add(
            reals.RealOps.add(
                reals.RealOps.mul(a.w, a.w),
                reals.RealOps.mul(a.x, a.x)
            ),
            reals.RealOps.add(
                reals.RealOps.mul(a.y, a.y),
                reals.RealOps.mul(a.z, a.z)
            ),
        );
    }
};
