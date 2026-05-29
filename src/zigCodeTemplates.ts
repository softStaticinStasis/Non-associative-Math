import { ZigFile } from './types';

export const zigRepositoryFiles: ZigFile[] = [
  {
    name: "group.zig",
    path: "src/group.zig",
    description: "Defines core algebraic structures, coordinates, and perfect zero-entropy wavefunctions.",
    content: `//! Geometric Unification - Absolute Zero Coordinate Structures
const std = @import("std");
const Allocator = std.mem.Allocator;

/// Represents a state coordinate in the unified manifold
pub const UnificationState = struct {
    id: u32,
    phase: f64,
    energy_eigenvalue: f64,
    entropy_contribution: f64,

    pub fn init(id: u32, phase: f64, energy: f64) UnificationState {
        return .{
            .id = id,
            .phase = phase,
            .energy_eigenvalue = energy,
            .entropy_contribution = 0.0, // Absolute zero starting entropy
        };
    }
};

/// Represents the high-density Unstable Unity field before symmetry breaking
pub const UnstableUnityField = struct {
    core_potential: f64,
    order: usize,
    states: []UnificationState,
    allocator: Allocator,

    pub fn init(allocator: Allocator, order: usize) !UnstableUnityField {
        const states = try allocator.alloc(UnificationState, order);
        for (states, 0..) |*s, i| {
            const phase = (@as(f64, @floatFromInt(i)) / @as(f64, @floatFromInt(order))) * 2.0 * std.math.pi;
            s.* = UnificationState.init(@intCast(i), phase, 1.0);
        }
        return UnstableUnityField{
            .core_potential = 100.0,
            .order = order,
            .states = states,
            .allocator = allocator,
        };
    }

    pub fn deinit(self: UnstableUnityField) void {
        self.allocator.free(self.states);
    }
};
`
  },
  {
    name: "balance.zig",
    path: "src/balance.zig",
    description: "Implements physical coordinate systems, 3D vectors, and geometric force optimization.",
    content: `//! 3D Spatial Vector Operations
const std = @import("std");

pub const Vec3 = struct {
    x: f64,
    y: f64,
    z: f64,

    pub fn add(self: Vec3, other: Vec3) Vec3 {
        return .{ .x = self.x + other.x, .y = self.y + other.y, .z = self.z + other.z };
    }

    pub fn sub(self: Vec3, other: Vec3) Vec3 {
        return .{ .x = self.x - other.x, .y = self.y - other.y, .z = self.z - other.z };
    }

    pub fn mul(self: Vec3, scalar: f64) Vec3 {
        return .{ .x = self.x * scalar, .y = self.y * scalar, .z = self.z * scalar };
    }

    pub fn len(self: Vec3) f64 {
        return @sqrt(self.x * self.x + self.y * self.y + self.z * self.z);
    }

    pub fn normalize(self: Vec3) Vec3 {
        const l = self.len();
        if (l < 1e-9) return .{ .x = 1.0, .y = 0.0, .z = 0.0 };
        return .{ .x = self.x / l, .y = self.y / l, .z = self.z / l };
    }
};
`
  },
  {
    name: "decay.zig",
    path: "src/decay.zig",
    description: "Core particle physics model simulating ejections of electrons, positrons, and antineutrinos from collapsing unity.",
    content: `//! Absolute Zero Entropy Quantum State Decay Trajectory Tracker
const std = @import("std");
const Vec3 = @import("balance.zig").Vec3;

pub const ParticleType = enum {
    beta_minus,   // Released Electron stream
    beta_plus,    // Positron symmetry partner
    antineutrino, // Core momentum balancing carrier
};

pub const DecayParticle = struct {
    type: ParticleType,
    pos: Vec3,
    velocity: Vec3,
    mass: f64,
    charge: f64,
    life_ticks: usize,
};

/// Triggers massive beta ejections with high kinetic momentum from the collapsing unstable unity core
pub fn ejectBetaDecay(
    allocator: std.mem.Allocator,
    origin: Vec3,
    count: usize,
    seed: u64,
) !std.ArrayList(DecayParticle) {
    var particles = std.ArrayList(DecayParticle).init(allocator);
    var prng = std.rand.DefaultPrng.init(seed);
    const rand = prng.random();

    for (0..count) |i| {
        // Distribute particle types sequentially
        const p_type = if (i % 3 == 0) ParticleType.beta_minus 
                       else if (i % 3 == 1) ParticleType.beta_plus 
                       else ParticleType.antineutrino;

        // Eject spherically/isotropically
        const theta = rand.float(f64) * 2.0 * std.math.pi;
        const phi = std.math.acos(2.0 * rand.float(f64) - 1.0);
        
        const speed = 10.0 + rand.float(f64) * 35.0; // High relativistic velocities
        const vel = Vec3{
            .x = speed * @sin(phi) * @cos(theta),
            .y = speed * @sin(phi) * @sin(theta),
            .z = speed * @cos(phi),
        };

        const mass = if (p_type == .antineutrino) 1e-36 else 9.109e-31;
        const charge = if (p_type == .beta_minus) -1.0 else if (p_type == .beta_plus) 1.0 else 0.0;

        try particles.append(.{
            .type = p_type,
            .pos = origin,
            .velocity = vel,
            .mass = mass,
            .charge = charge,
            .life_ticks = 120 + rand.uintLessThan(usize, 250),
        });
    }
    return particles;
}
`
  },
  {
    name: "main.zig",
    path: "src/main.zig",
    description: "Launches solver initialization, establishes Absolute 0, triggers collapse, and prints beta decay metrics.",
    content: `//! CLI entry point for the Geometric Unification State & Decay Simulator
const std = @import("std");
const group = @import("group.zig");
const balance = @import("balance.zig");
const decay = @import("decay.zig");

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    const allocator = gpa.allocator();

    const stdout = std.io.getStdOut().writer();
    try stdout.print("=== UNIVERSE SIMULATOR: COLLAPSE OF UNSTABLE UNITY ===\n", .{});
    try stdout.print("System initializing at absolute zero entropy (S = 0)...\n\n", .{});

    // 1. Setup field with order 64 standard coordinates in perfect coherence
    var field = try group.UnstableUnityField.init(allocator, 64);
    defer field.deinit();

    try stdout.print("[Task 1] Unified Core stabilized at Absolute Zero temperature.\n", .{});
    try stdout.print("  ▸ Coherent states: {}\n", .{field.states.len});
    try stdout.print("  ▸ Entropy Index: 0.000000000 J/K\n", .{});
    try stdout.print("  ▸ Energy potential: {d:.2} eV\n\n", .{field.core_potential});

    // 2. Triggering Spontaneous Symmetry Breaking Collapse
    try stdout.print("[Task 2] Tripping safety limit... Inducing Collapse of Unstable Unity!\n", .{});
    const core_origin = balance.Vec3{ .x = 0.0, .y = 0.0, .z = 0.0 };
    
    // Ejecting massive beta decay events
    const decay_particles_count = 150;
    var cascade = try decay.ejectBetaDecay(allocator, core_origin, decay_particles_count, 42);
    defer cascade.deinit();

    try stdout.print("  ▸ CORE DESTABILIZED! Instant transition to maximal chaos.\n", .{});
    try stdout.print("  ▸ Ejected {} energetic sub-atomic particles via cascading thermal decay.\n", .{cascade.items.len});

    // 3. Counting sub-particle species classes
    var b_minus: usize = 0;
    var b_plus: usize = 0;
    var antineutrinos: usize = 0;

    for (cascade.items) |p| {
        switch (p.type) {
            .beta_minus => b_minus += 1,
            .beta_plus => b_plus += 1,
            .antineutrino => antineutrinos += 1,
        }
    }

    try stdout.print("\n=== CASCADE SPECTRUM EJECTION ANALYSIS ===\n", .{});
    try stdout.print("  • Beta-Minus (Electrons):  {d} events\n", .{b_minus});
    try stdout.print("  • Beta-Plus (Positrons):    {d} events\n", .{b_plus});
    try stdout.print("  • Electron Antineutrinos:   {d} events\n", .{antineutrinos});
    try stdout.print("\nPerfect simulation resolved. Entropy minimized post-expansion.\n", .{});
}
`
  }
];
