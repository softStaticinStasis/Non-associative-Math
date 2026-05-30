/// Product Operations: Clifford, Wedge, and Inner Products

const std = @import("std");
const clifford = @import("clifford.zig");

pub const CliffordProduct = struct {
    pub fn multiply(a: clifford.Multivector, b: clifford.Multivector) clifford.Multivector {
        return clifford.Multivector.zero();
    }
};
