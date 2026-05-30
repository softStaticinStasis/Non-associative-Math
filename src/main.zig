/// Non-Associative Math: Relaxed-Associative Group Theory Test Model

pub const reals = @import("reals.zig");
pub const complex = @import("complex.zig");
pub const quaternions = @import("quaternions.zig");
pub const octonions = @import("octonions.zig");
pub const cayley_dickson = @import("cayley_dickson.zig");
pub const clifford = @import("clifford.zig");
pub const multivectors = @import("multivectors.zig");
pub const products = @import("products.zig");
pub const fine_structure = @import("fine_structure.zig");

pub const std = @import("std");

pub const VERSION = "0.1.0-alpha";
pub const FINE_STRUCTURE_CONSTANT: f64 = 1.0 / 137.035999084;
pub const PHI_GOLDEN_RATIO: f64 = 1.618033988749895;

pub const Config = struct {
    precision: enum { float32, float64 } = .float64,
    enable_chirality_locking: bool = true,
    enable_entropy_distribution: bool = true,
};

pub fn init(config: Config) Library {
    return Library{
        .precision = config.precision,
        .enable_chirality_locking = config.enable_chirality_locking,
        .enable_entropy_distribution = config.enable_entropy_distribution,
    };
}

pub const Library = struct {
    precision: enum { float32, float64 },
    enable_chirality_locking: bool,
    enable_entropy_distribution: bool,
};

pub fn main() void {
    std.debug.print("Non-Associative Math v{s}\n", .{VERSION});
}
