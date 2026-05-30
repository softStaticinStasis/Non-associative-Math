/// Cayley-Dickson Construction

const std = @import("std");
const reals = @import("reals.zig");
const complex = @import("complex.zig");
const quaternions = @import("quaternions.zig");
const octonions = @import("octonions.zig");

pub const AlgebraicProperties = struct {
    is_commutative: bool,
    is_associative: bool,
    is_division_algebra: bool,
    dimension: u32,
};

pub const properties = struct {
    pub const reals_props = AlgebraicProperties{
        .is_commutative = true,
        .is_associative = true,
        .is_division_algebra = true,
        .dimension = 1,
    };

    pub const complex_props = AlgebraicProperties{
        .is_commutative = true,
        .is_associative = true,
        .is_division_algebra = true,
        .dimension = 2,
    };

    pub const quaternion_props = AlgebraicProperties{
        .is_commutative = false,
        .is_associative = true,
        .is_division_algebra = true,
        .dimension = 4,
    };

    pub const octonion_props = AlgebraicProperties{
        .is_commutative = false,
        .is_associative = false,
        .is_division_algebra = true,
        .dimension = 8,
    };
};
