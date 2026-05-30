# Non-associative-Math: Relaxed-Associative Group Theory Test Model

A Zig-based implementation of non-associative group theory with geometric foundations, leveraging the Cayley-Dickson construction and Clifford algebras to model chirality-locked mathematical processes.

## Mathematical Foundation

### Core Axiom

```
ℝ ⊗ ℂ ⊗ ℋ ⊗ 𝕆  (Cayley-Dickson Chain)
↓
Cl(6, ℂ ⊗ 𝕆)  (Clifford Algebra over Complex Octonions)
```

### Cayley-Dickson Construction

**Progressive Algebra Building:**
- **ℝ** (Reals): 1-dimensional, commutative, associative
- **ℂ** (Complex): 2-dimensional, commutative, associative
- **ℋ** (Quaternions): 4-dimensional, non-commutative, associative
- **𝕆** (Octonions): 8-dimensional, non-commutative, **non-associative** ← Key property

### Clifford Algebra Cl(6, ℂ ⊗ 𝕆)

**Geometric Framework:**
- **64 basis blades** (2^6 from 6 generators)
- **Grade tracking** (0 through 6) for graded structure
- **Complex octonion coefficients** per blade
- **Particle layer isolation** through blade composition
- **Dynamic particle mapping** via fine-structure constant distribution

## Core Features

### 1. Cayley-Dickson Construction
Progressive building of algebras with decreasing algebraic properties.

### 2. Clifford Algebra Operations
- **Clifford Product**: Full geometric multiplication with blade contraction
- **Wedge Product**: Exterior algebra operations
- **Inner Product**: Geometric contraction operations

### 3. Particle Layer Mapping
Dynamic determination through fine-structure constant distribution.

### 4. Fine-Structure Constant Distribution
Models perfect circularity and gravitational constant distribution.

## Building

```bash
zig build
```

## Testing

```bash
zig build test
```

## Status

**Version:** 0.1.0-alpha  
**Status:** Foundation initialization (Mathematical Axiom Phase)
