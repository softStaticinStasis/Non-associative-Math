/// Multivector Operations and Particle Layer Management

const std = @import("std");
const clifford = @import("clifford.zig");

pub const ParticleLayer = struct {
    blade_mask: clifford.BladeMask,
    grade: clifford.Grade,
    chirality: i2,
    layer_id: u8,
};
