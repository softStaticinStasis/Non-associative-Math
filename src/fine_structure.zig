/// Fine Structure Constant Distribution

const std = @import("std");
const clifford = @import("clifford.zig");

pub const FINE_STRUCTURE_CONSTANT: f64 = 1.0 / 137.035999084;
pub const GRAVITATIONAL_COUPLING: f64 = 6.67430e-11;

pub const EntropyState = struct {
    alpha: f64 = FINE_STRUCTURE_CONSTANT,
    total_entropy: f64 = 0.0,
    layer_entropies: [64]f64 = undefined,
};
