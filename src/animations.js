// ============ Proportionally Scaled Drawing Utilities ============
// All coordinates designed at REF_W=360, scaled by s = w / REF_W

const REF_W = 360;

function drawGround(ctx, w, y, s) {
  ctx.strokeStyle = "rgba(0,0,0,0.1)";
  ctx.lineWidth = s;
  ctx.beginPath();
  ctx.moveTo(20 * s, y);
  ctx.lineTo(w - 20 * s, y);
  ctx.stroke();
  ctx.fillStyle = "rgba(90, 130, 110, 0.08)";
  ctx.fillRect(40 * s, y, w - 80 * s, 4 * s);
}

function drawTorso(ctx, x1, y1, x2, y2, s) {
  ctx.strokeStyle = "#2D2D2D";
  ctx.lineWidth = 5 * s;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

function drawCurvedTorso(ctx, x1, y1, cpx, cpy, x2, y2, s) {
  ctx.strokeStyle = "#2D2D2D";
  ctx.lineWidth = 5 * s;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.quadraticCurveTo(cpx, cpy, x2, y2);
  ctx.stroke();
}

function drawLimb(ctx, x1, y1, x2, y2, color, s) {
  ctx.strokeStyle = color;
  ctx.lineWidth = 4 * s;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x2, y2, 3 * s, 0, Math.PI * 2);
  ctx.fill();
}

function drawHead(ctx, x, y, s) {
  ctx.fillStyle = "#2D2D2D";
  ctx.beginPath();
  ctx.arc(x, y, 10 * s, 0, Math.PI * 2);
  ctx.fill();
}

function drawGroundContact(ctx, x1, y, x2, s) {
  ctx.fillStyle = "rgba(192, 57, 43, 0.12)";
  ctx.fillRect(x1, y - 2 * s, x2 - x1, 6 * s);
  for (let x = x1 + 8 * s; x < x2; x += 15 * s) {
    ctx.fillStyle = "rgba(192, 57, 43, 0.3)";
    ctx.beginPath();
    ctx.arc(x, y + 2 * s, 2 * s, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawParallette(ctx, x, topY, groundY, s) {
  ctx.strokeStyle = "#666";
  ctx.lineWidth = 3 * s;
  ctx.beginPath();
  ctx.moveTo(x - 12 * s, topY);
  ctx.lineTo(x + 12 * s, topY);
  ctx.stroke();
  ctx.lineWidth = 2 * s;
  ctx.beginPath();
  ctx.moveTo(x - 8 * s, topY);
  ctx.lineTo(x - 10 * s, groundY);
  ctx.moveTo(x + 8 * s, topY);
  ctx.lineTo(x + 10 * s, groundY);
  ctx.stroke();
}

function drawLabel(ctx, x, y, text, color, s) {
  ctx.font = `600 ${Math.max(9, 11 * s)}px -apple-system, sans-serif`;
  ctx.fillStyle = color;
  ctx.textAlign = "center";
  const lines = text.split("\n");
  lines.forEach((line, i) => {
    ctx.fillText(line, x, y + i * 14 * s);
  });
}

function drawArrowHead(ctx, x, y, angle, color, s) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x + Math.cos(angle) * 6 * s, y + Math.sin(angle) * 6 * s);
  ctx.lineTo(x + Math.cos(angle + 2.5) * 6 * s, y + Math.sin(angle + 2.5) * 6 * s);
  ctx.lineTo(x + Math.cos(angle - 2.5) * 6 * s, y + Math.sin(angle - 2.5) * 6 * s);
  ctx.closePath();
  ctx.fill();
}

// ============ Animation Definitions ============

export const ANIMATIONS = {
  tabletop: {
    name: "Tabletop Start",
    desc: "Right knee down, left leg extended back resting on mat. Hands under shoulders.",
    safety: "Left leg is just lying on the mat \u2014 gravity holds it.",
    canvasHeight: 220,
    draw: (ctx, w, h, t) => {
      const s = w / REF_W;
      const cx = w / 2, ground = h * 0.78;
      drawGround(ctx, w, ground, s);
      const shoulderX = cx - 40 * s, shoulderY = ground - 95 * s;
      const hipX = cx + 30 * s, hipY = ground - 85 * s;
      drawTorso(ctx, shoulderX, shoulderY, hipX, hipY, s);
      drawHead(ctx, shoulderX - 15 * s, shoulderY - 18 * s, s);
      drawLimb(ctx, shoulderX, shoulderY, shoulderX - 15 * s, ground, "#2D2D2D", s);
      drawLimb(ctx, shoulderX + 15 * s, shoulderY + 5 * s, shoulderX, ground, "#2D2D2D", s);
      drawLimb(ctx, hipX, hipY, hipX + 10 * s, ground, "#2D2D2D", s);
      drawLimb(ctx, hipX + 10 * s, ground, hipX - 5 * s, ground + 2 * s, "#2D2D2D", s);
      const leftKneeX = hipX + 55 * s, leftFootX = hipX + 115 * s;
      drawLimb(ctx, hipX, hipY, leftKneeX, ground - 3 * s, "#C0392B", s);
      drawLimb(ctx, leftKneeX, ground - 3 * s, leftFootX, ground - 1 * s, "#C0392B", s);
      drawGroundContact(ctx, leftKneeX, ground, leftFootX, s);
      drawLabel(ctx, leftFootX - 30 * s, ground + 25 * s, "Left leg rests on mat", "#C0392B", s);
      drawLabel(ctx, shoulderX - 10 * s, ground + 25 * s, "Hands + R knee = base", "#2D2D2D", s);
    }
  },

  plank: {
    name: "Plank (NWB)",
    desc: "Right foot is your only ground contact for legs. Left shin/top-of-foot drags on the mat.",
    safety: "One-footed plank. Left leg is dead weight on the floor. Harder on core \u2014 that's the point.",
    canvasHeight: 220,
    draw: (ctx, w, h, t) => {
      const s = w / REF_W;
      const cx = w / 2, ground = h * 0.78;
      drawGround(ctx, w, ground, s);
      const shoulderX = cx - 70 * s, shoulderY = ground - 80 * s;
      const hipX = cx + 20 * s, hipY = ground - 65 * s;
      drawTorso(ctx, shoulderX, shoulderY, hipX, hipY, s);
      drawHead(ctx, shoulderX - 15 * s, shoulderY - 16 * s, s);
      drawLimb(ctx, shoulderX, shoulderY, shoulderX - 5 * s, ground, "#2D2D2D", s);
      drawLimb(ctx, shoulderX + 18 * s, shoulderY + 3 * s, shoulderX + 12 * s, ground, "#2D2D2D", s);
      const rFootX = hipX + 80 * s;
      drawLimb(ctx, hipX, hipY, hipX + 40 * s, ground - 35 * s, "#2D2D2D", s);
      drawLimb(ctx, hipX + 40 * s, ground - 35 * s, rFootX, ground, "#2D2D2D", s);
      ctx.fillStyle = "#2D2D2D";
      ctx.beginPath();
      ctx.arc(rFootX, ground - 2 * s, 4 * s, 0, Math.PI * 2);
      ctx.fill();
      const lKneeX = hipX + 50 * s, lFootX = hipX + 110 * s;
      drawLimb(ctx, hipX, hipY, lKneeX, ground - 4 * s, "#C0392B", s);
      drawLimb(ctx, lKneeX, ground - 4 * s, lFootX, ground - 1 * s, "#C0392B", s);
      drawGroundContact(ctx, lKneeX - 10 * s, ground, lFootX, s);
      drawLabel(ctx, rFootX - 15 * s, ground + 25 * s, "R foot active", "#2D2D2D", s);
      drawLabel(ctx, lFootX - 40 * s, ground + 42 * s, "L leg = sandbag on mat", "#C0392B", s);
    }
  },

  chaturanga: {
    name: "Chaturanga (NWB)",
    desc: "Lower from plank. Right foot stays, left leg slides down with you. Elbows hug ribs.",
    safety: "This is just a one-footed push-up. Left leg is along for the ride.",
    canvasHeight: 220,
    draw: (ctx, w, h, t) => {
      const s = w / REF_W;
      const cx = w / 2, ground = h * 0.78;
      drawGround(ctx, w, ground, s);
      const shoulderX = cx - 70 * s, shoulderY = ground - 45 * s;
      const hipX = cx + 20 * s, hipY = ground - 38 * s;
      drawTorso(ctx, shoulderX, shoulderY, hipX, hipY, s);
      drawHead(ctx, shoulderX - 12 * s, shoulderY - 14 * s, s);
      const elbowY = shoulderY + 5 * s;
      drawLimb(ctx, shoulderX, shoulderY, shoulderX + 2 * s, elbowY + 15 * s, "#2D2D2D", s);
      drawLimb(ctx, shoulderX + 2 * s, elbowY + 15 * s, shoulderX - 5 * s, ground, "#2D2D2D", s);
      drawLimb(ctx, shoulderX + 18 * s, shoulderY + 2 * s, shoulderX + 20 * s, elbowY + 17 * s, "#2D2D2D", s);
      drawLimb(ctx, shoulderX + 20 * s, elbowY + 17 * s, shoulderX + 13 * s, ground, "#2D2D2D", s);
      const rFootX = hipX + 82 * s;
      drawLimb(ctx, hipX, hipY, hipX + 42 * s, ground - 22 * s, "#2D2D2D", s);
      drawLimb(ctx, hipX + 42 * s, ground - 22 * s, rFootX, ground, "#2D2D2D", s);
      ctx.fillStyle = "#2D2D2D";
      ctx.beginPath();
      ctx.arc(rFootX, ground - 2 * s, 4 * s, 0, Math.PI * 2);
      ctx.fill();
      const lKneeX = hipX + 50 * s, lFootX = hipX + 110 * s;
      drawLimb(ctx, hipX, hipY, lKneeX, ground - 3 * s, "#C0392B", s);
      drawLimb(ctx, lKneeX, ground - 3 * s, lFootX, ground - 1 * s, "#C0392B", s);
      drawGroundContact(ctx, lKneeX - 10 * s, ground, lFootX, s);
      ctx.strokeStyle = "rgba(0,0,0,0.25)";
      ctx.lineWidth = 1.5 * s;
      ctx.setLineDash([4 * s, 3 * s]);
      ctx.beginPath();
      ctx.moveTo(cx - 20 * s, shoulderY - 35 * s);
      ctx.lineTo(cx - 20 * s, shoulderY - 12 * s);
      ctx.stroke();
      ctx.setLineDash([]);
      drawArrowHead(ctx, cx - 20 * s, shoulderY - 12 * s, Math.PI / 2, "rgba(0,0,0,0.25)", s);
      drawLabel(ctx, cx - 50 * s, shoulderY - 45 * s, "Lower together", "rgba(0,0,0,0.4)", s);
      drawLabel(ctx, lFootX - 40 * s, ground + 25 * s, "L leg slides with you", "#C0392B", s);
    }
  },

  updog: {
    name: "Up-Dog (NWB)",
    desc: "Press up. Chest lifts, hips sag toward mat. Right foot top-down, left leg rests on mat.",
    safety: "Hip EXTENSION, not flexion. Left leg is completely passive \u2014 gravity + the mat do all the work.",
    canvasHeight: 220,
    draw: (ctx, w, h, t) => {
      const s = w / REF_W;
      const cx = w / 2, ground = h * 0.78;
      drawGround(ctx, w, ground, s);
      const shoulderX = cx - 55 * s, shoulderY = ground - 90 * s;
      const hipX = cx + 30 * s, hipY = ground - 25 * s;
      drawCurvedTorso(ctx, shoulderX, shoulderY, cx, ground - 80 * s, hipX, hipY, s);
      drawHead(ctx, shoulderX - 8 * s, shoulderY - 22 * s, s);
      drawLimb(ctx, shoulderX, shoulderY, shoulderX - 8 * s, ground, "#2D2D2D", s);
      drawLimb(ctx, shoulderX + 20 * s, shoulderY + 15 * s, shoulderX + 12 * s, ground, "#2D2D2D", s);
      const rFootX = hipX + 75 * s;
      drawLimb(ctx, hipX, hipY, hipX + 38 * s, ground - 12 * s, "#2D2D2D", s);
      drawLimb(ctx, hipX + 38 * s, ground - 12 * s, rFootX, ground, "#2D2D2D", s);
      const lFootX = hipX + 110 * s;
      // Left leg — thigh, shin, foot ALL on mat (ground contact the full length)
      drawLimb(ctx, hipX, hipY, hipX + 55 * s, ground - 3 * s, "#C0392B", s);
      drawLimb(ctx, hipX + 55 * s, ground - 3 * s, lFootX, ground - 1 * s, "#C0392B", s);
      drawGroundContact(ctx, hipX + 15 * s, ground, lFootX, s);
      drawLabel(ctx, shoulderX - 20 * s, shoulderY - 35 * s, "Chest lifts", "#2D2D2D", s);
      drawLabel(ctx, lFootX - 50 * s, ground + 25 * s, "L thigh+shin stay ON mat", "#C0392B", s);
    }
  },

  downdog: {
    name: "One-Legged Down-Dog",
    desc: "Only right foot is pressing. Left leg floats behind in hip extension (glute holds it, NOT hip flexor).",
    safety: "Left leg extends BEHIND you \u2014 that's hip extension via glutes. Hip flexors are completely off.",
    canvasHeight: 220,
    draw: (ctx, w, h, t) => {
      const s = w / REF_W;
      const cx = w / 2, ground = h * 0.78;
      drawGround(ctx, w, ground, s);
      const handX = cx - 70 * s, handY = ground;
      const hipX = cx, hipY = ground - 110 * s;
      const footX = cx + 50 * s, footY = ground;
      drawLimb(ctx, handX + 10 * s, handY - 2 * s, hipX, hipY, "#2D2D2D", s);
      drawHead(ctx, handX + 5 * s, handY - 25 * s, s);
      drawLimb(ctx, handX + 5 * s, handY - 15 * s, handX - 5 * s, ground, "#2D2D2D", s);
      drawLimb(ctx, handX + 18 * s, handY - 10 * s, handX + 12 * s, ground, "#2D2D2D", s);
      drawLimb(ctx, hipX, hipY, hipX + 25 * s, ground - 55 * s, "#2D2D2D", s);
      drawLimb(ctx, hipX + 25 * s, ground - 55 * s, footX, ground, "#2D2D2D", s);
      ctx.fillStyle = "#2D2D2D";
      ctx.beginPath();
      ctx.arc(footX, ground - 2 * s, 4 * s, 0, Math.PI * 2);
      ctx.fill();
      const breath = Math.sin(t * 0.8) * 5 * s;
      const lKneeX = hipX + 40 * s, lKneeY = hipY - 15 * s + breath;
      const lFootX = hipX + 85 * s, lFootY = hipY - 5 * s + breath;
      drawLimb(ctx, hipX, hipY, lKneeX, lKneeY, "#C0392B", s);
      drawLimb(ctx, lKneeX, lKneeY, lFootX, lFootY, "#C0392B", s);
      ctx.fillStyle = "rgba(46, 139, 87, 0.25)";
      ctx.beginPath();
      ctx.arc(hipX + 8 * s, hipY + 5 * s, 14 * s, 0, Math.PI * 2);
      ctx.fill();
      drawLabel(ctx, hipX + 5 * s, hipY + 35 * s, "Glute holds leg up", "#2E8B57", s);
      drawLabel(ctx, lFootX - 10 * s, lFootY - 18 * s, "L leg: hip EXTENSION", "#C0392B", s);
      drawLabel(ctx, footX - 10 * s, ground + 25 * s, "R foot only", "#2D2D2D", s);
    }
  },

  transition: {
    name: "The Drag Transition",
    desc: "Tabletop \u2192 Plank: Right foot steps back while left shin drags along the mat surface.",
    safety: "Not graceful. Not supposed to be. The drag keeps left hip flexor at zero.",
    canvasHeight: 220,
    draw: (ctx, w, h, t) => {
      const s = w / REF_W;
      const cx = w / 2, ground = h * 0.78;
      drawGround(ctx, w, ground, s);
      const phase = (Math.sin(t * 0.6) + 1) / 2;
      const shoulderX = cx - 50 * s - phase * 20 * s;
      const shoulderY = ground - 80 * s - phase * 5 * s;
      const hipX = cx + 20 * s;
      const hipY = ground - 70 * s - phase * 2 * s;
      drawTorso(ctx, shoulderX, shoulderY, hipX, hipY, s);
      drawHead(ctx, shoulderX - 14 * s, shoulderY - 16 * s, s);
      drawLimb(ctx, shoulderX, shoulderY, shoulderX - 5 * s, ground, "#2D2D2D", s);
      drawLimb(ctx, shoulderX + 18 * s, shoulderY + 3 * s, shoulderX + 12 * s, ground, "#2D2D2D", s);
      const rKneeX = hipX + 15 * s + phase * 30 * s;
      const rKneeY = ground - 10 * s - phase * 25 * s;
      const rFootX = hipX + 40 * s + phase * 45 * s;
      const rFootY = ground;
      drawLimb(ctx, hipX, hipY, rKneeX, rKneeY, "#2D2D2D", s);
      drawLimb(ctx, rKneeX, rKneeY, rFootX, rFootY, "#2D2D2D", s);
      const lKneeX = hipX + 30 * s + phase * 25 * s;
      const lFootX = hipX + 75 * s + phase * 35 * s;
      drawLimb(ctx, hipX, hipY, lKneeX, ground - 3 * s, "#C0392B", s);
      drawLimb(ctx, lKneeX, ground - 3 * s, lFootX, ground - 1 * s, "#C0392B", s);
      drawGroundContact(ctx, lKneeX - 15 * s, ground, lFootX, s);
      ctx.strokeStyle = "#C0392B88";
      ctx.lineWidth = 1.5 * s;
      ctx.setLineDash([3 * s, 3 * s]);
      ctx.beginPath();
      ctx.moveTo(lFootX - 30 * s, ground + 15 * s);
      ctx.lineTo(lFootX + 10 * s, ground + 15 * s);
      ctx.stroke();
      ctx.setLineDash([]);
      drawArrowHead(ctx, lFootX + 10 * s, ground + 15 * s, 0, "#C0392B88", s);
      drawLabel(ctx, lFootX - 35 * s, ground + 35 * s, "L leg drags along", "#C0392B", s);
      drawLabel(ctx, rFootX - 25 * s, rFootY + 50 * s, "R foot steps back", "#2D2D2D", s);
    }
  },

  lsit: {
    name: "R-Leg L-Sit (Parallettes)",
    desc: "Right leg extends actively. Left leg hangs completely passive \u2014 gravity pulls it down.",
    safety: "Right hip flexor works hard. Left hip flexor does NOTHING \u2014 left leg hangs like a pendulum.",
    canvasHeight: 220,
    draw: (ctx, w, h, t) => {
      const s = w / REF_W;
      const cx = w / 2, ground = h * 0.82;
      drawGround(ctx, w, ground, s);
      const pLeftX = cx - 28 * s, pRightX = cx + 28 * s;
      const pTopY = ground - 50 * s;
      drawParallette(ctx, pLeftX, pTopY, ground, s);
      drawParallette(ctx, pRightX, pTopY, ground, s);
      const hipX = cx, hipY = pTopY - 15 * s;
      const shoulderX = cx, shoulderY = hipY - 50 * s;
      drawTorso(ctx, shoulderX, shoulderY, hipX, hipY, s);
      drawHead(ctx, shoulderX, shoulderY - 22 * s, s);
      drawLimb(ctx, shoulderX - 12 * s, shoulderY + 5 * s, pLeftX, pTopY, "#2D2D2D", s);
      drawLimb(ctx, shoulderX + 12 * s, shoulderY + 5 * s, pRightX, pTopY, "#2D2D2D", s);
      const rKneeX = hipX + 30 * s, rKneeY = hipY + 5 * s;
      const rFootX = hipX + 75 * s, rFootY = hipY;
      drawLimb(ctx, hipX + 5 * s, hipY, rKneeX, rKneeY, "#2D2D2D", s);
      drawLimb(ctx, rKneeX, rKneeY, rFootX, rFootY, "#2D2D2D", s);
      ctx.fillStyle = "rgba(45, 45, 45, 0.15)";
      ctx.beginPath();
      ctx.arc(hipX + 10 * s, hipY - 3 * s, 12 * s, 0, Math.PI * 2);
      ctx.fill();
      const sway = Math.sin(t * 0.5) * 3 * s;
      const lKneeX = hipX - 5 * s + sway, lKneeY = hipY + 40 * s;
      const lFootX = hipX - 8 * s + sway * 1.3, lFootY = hipY + 75 * s;
      drawLimb(ctx, hipX - 5 * s, hipY, lKneeX, lKneeY, "#C0392B", s);
      drawLimb(ctx, lKneeX, lKneeY, lFootX, lFootY, "#C0392B", s);
      drawLabel(ctx, rFootX - 5 * s, rFootY - 18 * s, "R leg: active", "#2D2D2D", s);
      drawLabel(ctx, lFootX - 35 * s, lFootY + 18 * s, "L leg: hangs", "#C0392B", s);
      ctx.strokeStyle = "#C0392B55";
      ctx.lineWidth = 1.5 * s;
      ctx.beginPath();
      ctx.moveTo(lFootX, lFootY + 5 * s);
      ctx.lineTo(lFootX, lFootY + 22 * s);
      ctx.stroke();
      drawArrowHead(ctx, lFootX, lFootY + 22 * s, Math.PI / 2, "#C0392B55", s);
    }
  },

  inversion: {
    name: "FeetUp Headstand \u2014 Leg Lowers",
    desc: "Inverted: lowering a leg toward floor is HIP EXTENSION work (glutes/hamstrings control it). Hip flexors are OFF.",
    safety: "Gravity reversal: what looks like 'flexion' is actually controlled by extensors. Your hip flexors are passengers.",
    canvasHeight: 300,
    draw: (ctx, w, h, t) => {
      const s = w / REF_W;
      const cx = w / 2, ground = h * 0.85;
      drawGround(ctx, w, ground, s);
      ctx.fillStyle = "#8B7355";
      ctx.fillRect(cx - 40 * s, ground - 10 * s, 80 * s, 10 * s);
      ctx.fillRect(cx - 35 * s, ground - 55 * s, 70 * s, 45 * s);
      ctx.fillStyle = "#A0926B";
      ctx.fillRect(cx - 30 * s, ground - 50 * s, 60 * s, 35 * s);
      const headY = ground - 55 * s;
      const shoulderY = headY - 25 * s;
      const hipY = shoulderY - 60 * s;
      drawHead(ctx, cx, headY - 5 * s, s);
      drawTorso(ctx, cx, shoulderY, cx, hipY, s);
      drawLimb(ctx, cx - 10 * s, shoulderY, cx - 30 * s, ground - 48 * s, "#2D2D2D", s);
      drawLimb(ctx, cx + 10 * s, shoulderY, cx + 30 * s, ground - 48 * s, "#2D2D2D", s);
      drawLimb(ctx, cx + 3 * s, hipY, cx + 5 * s, hipY - 45 * s, "#2D2D2D", s);
      drawLimb(ctx, cx + 5 * s, hipY - 45 * s, cx + 6 * s, hipY - 85 * s, "#2D2D2D", s);
      const lowerAmt = (Math.sin(t * 0.5) + 1) / 2;
      const lAngle = -Math.PI / 2 + lowerAmt * (Math.PI / 3);
      const lKneeX = cx - 3 * s + Math.cos(lAngle) * 42 * s;
      const lKneeY = hipY + Math.sin(lAngle) * 42 * s;
      const lFootX = cx - 3 * s + Math.cos(lAngle) * 82 * s;
      const lFootY = hipY + Math.sin(lAngle) * 82 * s;
      drawLimb(ctx, cx - 3 * s, hipY, lKneeX, lKneeY, "#C0392B", s);
      drawLimb(ctx, lKneeX, lKneeY, lFootX, lFootY, "#C0392B", s);
      ctx.fillStyle = "rgba(46, 139, 87, 0.3)";
      ctx.beginPath();
      ctx.arc(cx - 5 * s, hipY + 8 * s, 14 * s, 0, Math.PI * 2);
      ctx.fill();
      drawLabel(ctx, cx + 50 * s, hipY - 70 * s, "R leg: gravity holds", "#2D2D2D", s);
      drawLabel(ctx, cx - 85 * s, hipY - 10 * s, "Glute/ham controls\nthe lowering", "#2E8B57", s);
      const labelX = lFootX > cx ? lFootX + 20 * s : lFootX - 50 * s;
      const labelY = lFootY < hipY - 20 * s ? lFootY + 25 * s : lFootY - 10 * s;
      drawLabel(ctx, labelX, labelY, "L leg: extensors\nwork eccentrically", "#C0392B", s);
    }
  },

  headstand: {
    name: "Supported Headstand \u2014 Hold",
    desc: "Inverted on FeetUp Trainer. Both legs straight up. Gravity holds everything \u2014 zero hip flexor demand.",
    safety: "Once inverted, both legs are gravity-held. Hip flexors are completely off. Explore leg variations from here.",
    canvasHeight: 300,
    draw: (ctx, w, h, t) => {
      const s = w / REF_W;
      const cx = w / 2, ground = h * 0.85;
      drawGround(ctx, w, ground, s);
      ctx.fillStyle = "#8B7355";
      ctx.fillRect(cx - 40 * s, ground - 10 * s, 80 * s, 10 * s);
      ctx.fillRect(cx - 35 * s, ground - 55 * s, 70 * s, 45 * s);
      ctx.fillStyle = "#A0926B";
      ctx.fillRect(cx - 30 * s, ground - 50 * s, 60 * s, 35 * s);
      const headY = ground - 55 * s;
      const shoulderY = headY - 25 * s;
      const hipY = shoulderY - 60 * s;
      drawHead(ctx, cx, headY - 5 * s, s);
      drawTorso(ctx, cx, shoulderY, cx, hipY, s);
      drawLimb(ctx, cx - 10 * s, shoulderY, cx - 30 * s, ground - 48 * s, "#2D2D2D", s);
      drawLimb(ctx, cx + 10 * s, shoulderY, cx + 30 * s, ground - 48 * s, "#2D2D2D", s);
      const sway = Math.sin(t * 0.3) * 2 * s;
      drawLimb(ctx, cx + 3 * s, hipY, cx + 4 * s + sway, hipY - 45 * s, "#2D2D2D", s);
      drawLimb(ctx, cx + 4 * s + sway, hipY - 45 * s, cx + 5 * s + sway * 1.2, hipY - 85 * s, "#2D2D2D", s);
      drawLimb(ctx, cx - 3 * s, hipY, cx - 4 * s + sway, hipY - 45 * s, "#C0392B", s);
      drawLimb(ctx, cx - 4 * s + sway, hipY - 45 * s, cx - 5 * s + sway * 1.2, hipY - 85 * s, "#C0392B", s);
      drawLabel(ctx, cx + 50 * s, hipY - 70 * s, "Both legs: gravity-held", "#2D2D2D", s);
      drawLabel(ctx, cx - 70 * s, hipY, "Zero hip flexor\ndemand", "#2E8B57", s);
      drawLabel(ctx, cx, ground + 20 * s, "FeetUp Trainer support", "#8B7355", s);
    }
  },

  cars: {
    name: "Shoulder CARs",
    desc: "Controlled Articular Rotations \u2014 slowly trace the largest circle you can with your arm. Full range, maximal control.",
    safety: "Seated position, zero lower body involvement. Pure joint health maintenance for shoulders.",
    canvasHeight: 220,
    draw: (ctx, w, h, t) => {
      const s = w / REF_W;
      const cx = w / 2, ground = h * 0.82;
      drawGround(ctx, w, ground, s);
      const hipX = cx, hipY = ground - 40 * s;
      const shoulderX = cx, shoulderY = hipY - 55 * s;
      drawTorso(ctx, shoulderX, shoulderY, hipX, hipY, s);
      drawHead(ctx, shoulderX, shoulderY - 22 * s, s);
      drawLimb(ctx, hipX - 5 * s, hipY, hipX - 35 * s, ground - 5 * s, "#2D2D2D", s);
      drawLimb(ctx, hipX + 5 * s, hipY, hipX + 35 * s, ground - 5 * s, "#2D2D2D", s);
      drawLimb(ctx, shoulderX - 12 * s, shoulderY + 5 * s, hipX - 25 * s, hipY - 5 * s, "#2D2D2D", s);
      const angle = t * 0.4;
      const radius = 55 * s;
      const elbowX = shoulderX + 12 * s + Math.cos(angle) * radius * 0.5;
      const elbowY = shoulderY + Math.sin(angle) * radius * 0.5;
      const handX = shoulderX + 12 * s + Math.cos(angle) * radius;
      const handY = shoulderY + Math.sin(angle) * radius;
      drawLimb(ctx, shoulderX + 12 * s, shoulderY, elbowX, elbowY, "#2D2D2D", s);
      drawLimb(ctx, elbowX, elbowY, handX, handY, "#2D2D2D", s);
      ctx.strokeStyle = "rgba(45, 45, 45, 0.12)";
      ctx.lineWidth = 1.5 * s;
      ctx.setLineDash([4 * s, 4 * s]);
      ctx.beginPath();
      ctx.arc(shoulderX + 12 * s, shoulderY, radius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.strokeStyle = "rgba(160, 82, 45, 0.3)";
      ctx.lineWidth = 2 * s;
      ctx.beginPath();
      for (let i = 0; i < 20; i++) {
        const a = angle - i * 0.05;
        const x = shoulderX + 12 * s + Math.cos(a) * radius;
        const y = shoulderY + Math.sin(a) * radius;
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
      drawLabel(ctx, cx, ground + 18 * s, "Full range, slow control", "#A0522D", s);
    }
  },

  dolphin: {
    name: "Dolphin Pose (NWB)",
    desc: "Forearms down, hips high. Like down-dog but on forearms \u2014 massive shoulder and core work.",
    safety: "Right foot pressing, left leg extended behind in hip extension. Left hip flexor completely off.",
    canvasHeight: 220,
    draw: (ctx, w, h, t) => {
      const s = w / REF_W;
      const cx = w / 2, ground = h * 0.78;
      drawGround(ctx, w, ground, s);
      const hipX = cx + 10 * s, hipY = ground - 100 * s;
      drawHead(ctx, cx - 38 * s, ground - 20 * s, s);
      drawLimb(ctx, cx - 30 * s, ground - 8 * s, hipX, hipY, "#2D2D2D", s);
      drawLimb(ctx, cx - 50 * s, ground - 8 * s, cx - 55 * s, ground, "#2D2D2D", s);
      drawLimb(ctx, cx - 15 * s, ground - 8 * s, cx - 20 * s, ground, "#2D2D2D", s);
      const rFootX = hipX + 55 * s;
      drawLimb(ctx, hipX, hipY, hipX + 28 * s, ground - 50 * s, "#2D2D2D", s);
      drawLimb(ctx, hipX + 28 * s, ground - 50 * s, rFootX, ground, "#2D2D2D", s);
      ctx.fillStyle = "#2D2D2D";
      ctx.beginPath();
      ctx.arc(rFootX, ground - 2 * s, 4 * s, 0, Math.PI * 2);
      ctx.fill();
      const breath = Math.sin(t * 0.7) * 4 * s;
      const lKneeX = hipX + 45 * s, lKneeY = hipY - 10 * s + breath;
      const lFootX = hipX + 90 * s, lFootY = hipY + breath;
      drawLimb(ctx, hipX, hipY, lKneeX, lKneeY, "#C0392B", s);
      drawLimb(ctx, lKneeX, lKneeY, lFootX, lFootY, "#C0392B", s);
      ctx.fillStyle = "rgba(46, 139, 87, 0.25)";
      ctx.beginPath();
      ctx.arc(hipX + 8 * s, hipY + 5 * s, 12 * s, 0, Math.PI * 2);
      ctx.fill();
      drawLabel(ctx, rFootX - 10 * s, ground + 25 * s, "R foot pressing", "#2D2D2D", s);
      drawLabel(ctx, lFootX - 15 * s, lFootY - 20 * s, "L leg: glute holds", "#2E8B57", s);
      drawLabel(ctx, cx - 35 * s, ground + 25 * s, "Forearms = base", "#2D2D2D", s);
    }
  },

  pseudoplanche: {
    name: "Pseudo-Planche Push-Up",
    desc: "Hands on parallettes turned back, lean forward past wrists. Feet stay on ground. Massive anterior delt + chest.",
    safety: "Zero hip flexor involvement. Feet and left leg rest on mat. All effort is shoulders, chest, and core.",
    canvasHeight: 220,
    draw: (ctx, w, h, t) => {
      const s = w / REF_W;
      const cx = w / 2, ground = h * 0.78;
      drawGround(ctx, w, ground, s);
      const pLeftX = cx - 60 * s, pRightX = cx - 25 * s;
      const pTopY = ground - 28 * s;
      drawParallette(ctx, pLeftX, pTopY, ground, s);
      drawParallette(ctx, pRightX, pTopY, ground, s);
      const phase = (Math.sin(t * 0.6) + 1) / 2;
      const dip = phase * 18 * s;
      const shoulderX = cx - 42 * s, shoulderY = pTopY - 30 * s + dip;
      const hipX = cx + 30 * s, hipY = ground - 35 * s + dip * 0.3;
      drawTorso(ctx, shoulderX, shoulderY, hipX, hipY, s);
      drawHead(ctx, shoulderX - 18 * s, shoulderY - 14 * s, s);
      drawLimb(ctx, shoulderX - 5 * s, shoulderY + 5 * s, pLeftX, pTopY, "#2D2D2D", s);
      drawLimb(ctx, shoulderX + 15 * s, shoulderY + 5 * s, pRightX, pTopY, "#2D2D2D", s);
      const rFootX = hipX + 75 * s;
      drawLimb(ctx, hipX, hipY, hipX + 38 * s, ground - 18 * s, "#2D2D2D", s);
      drawLimb(ctx, hipX + 38 * s, ground - 18 * s, rFootX, ground - 2 * s, "#2D2D2D", s);
      const lFootX = hipX + 110 * s;
      drawLimb(ctx, hipX, hipY, hipX + 55 * s, ground - 8 * s, "#C0392B", s);
      drawLimb(ctx, hipX + 55 * s, ground - 8 * s, lFootX, ground - 1 * s, "#C0392B", s);
      drawGroundContact(ctx, hipX + 40 * s, ground, lFootX, s);
      ctx.strokeStyle = "rgba(160, 82, 45, 0.4)";
      ctx.lineWidth = 1.5 * s;
      ctx.setLineDash([3 * s, 3 * s]);
      ctx.beginPath();
      ctx.moveTo(shoulderX - 5 * s, shoulderY - 25 * s);
      ctx.lineTo(shoulderX + 25 * s, shoulderY - 25 * s);
      ctx.stroke();
      ctx.setLineDash([]);
      drawArrowHead(ctx, shoulderX + 25 * s, shoulderY - 25 * s, 0, "rgba(160, 82, 45, 0.4)", s);
      drawLabel(ctx, shoulderX + 10 * s, shoulderY - 35 * s, "Lean past wrists", "#A0522D", s);
      drawLabel(ctx, lFootX - 35 * s, ground + 25 * s, "L leg rests on mat", "#C0392B", s);
    }
  },

  threadneedle: {
    name: "Thread the Needle",
    desc: "From tabletop, thread one arm under for deep thoracic rotation. Right knee base, left leg extended.",
    safety: "Pure spinal rotation from a stable base. Zero hip flexor involvement. Excellent for mid-back mobility.",
    canvasHeight: 240,
    draw: (ctx, w, h, t) => {
      const s = w / REF_W;
      const cx = w / 2, ground = h * 0.80;
      drawGround(ctx, w, ground, s);

      // Right knee clearly on the ground — thigh vertical, shin forward
      const rKneeX = cx + 30 * s, rKneeY = ground;
      const hipX = rKneeX, hipY = ground - 55 * s;
      // Right thigh (vertical down to knee on ground)
      drawLimb(ctx, hipX, hipY, rKneeX, rKneeY, "#2D2D2D", s);
      // Right shin — foot behind on ground
      drawLimb(ctx, rKneeX, rKneeY, rKneeX - 30 * s, ground, "#2D2D2D", s);
      drawGroundContact(ctx, rKneeX - 30 * s, ground, rKneeX + 8 * s, s);
      drawLabel(ctx, rKneeX, ground + 22 * s, "R knee base", "#2D2D2D", s);

      // Left leg — extended back, resting (passive/red)
      const lKneeX = hipX + 55 * s, lFootX = hipX + 110 * s;
      drawLimb(ctx, hipX, hipY, lKneeX, ground - 5 * s, "#C0392B", s);
      drawLimb(ctx, lKneeX, ground - 5 * s, lFootX, ground - 2 * s, "#C0392B", s);
      drawGroundContact(ctx, lKneeX, ground, lFootX, s);

      // Twist animation — 0 = neutral, 1 = fully threaded
      const twist = (Math.sin(t * 0.5) + 1) / 2;

      // Torso — nearly horizontal from hips to shoulders (tabletop)
      const shoulderX = cx - 50 * s;
      const shoulderY = hipY - 5 * s - twist * 12 * s;
      drawTorso(ctx, shoulderX, shoulderY, hipX, hipY, s);

      // Head — turns/drops with the twist
      const headX = shoulderX - 8 * s - twist * 15 * s;
      const headY = shoulderY - 5 * s + twist * 18 * s;
      drawHead(ctx, headX, headY, s);

      // Right (support) arm — straight down to ground from shoulder
      const rHandX = shoulderX + 15 * s, rHandY = ground;
      drawLimb(ctx, shoulderX + 10 * s, shoulderY + 3 * s, rHandX, rHandY, "#2D2D2D", s);

      // Threading arm — reaches clearly UNDER torso toward opposite side
      const threadStartX = shoulderX - 5 * s;
      const threadStartY = shoulderY + 5 * s;
      // At rest: arm hangs down; at full twist: reaches far under to the right
      const threadEndX = shoulderX + 20 * s + twist * 75 * s;
      const threadEndY = shoulderY + 15 * s + twist * 30 * s;
      drawLimb(ctx, threadStartX, threadStartY, threadEndX, threadEndY, "#A0522D", s);

      // Rotation arc — thicker and brighter for visibility
      if (twist > 0.15) {
        ctx.strokeStyle = `rgba(160, 82, 45, ${0.25 + twist * 0.45})`;
        ctx.lineWidth = 3 * s;
        ctx.beginPath();
        ctx.arc(cx - 10 * s, shoulderY + 15 * s, 22 * s, -Math.PI * 0.4, -Math.PI * 0.4 + twist * Math.PI * 1.1);
        ctx.stroke();
        // Arrowhead at the tip of the arc
        const arcAngle = -Math.PI * 0.4 + twist * Math.PI * 1.1;
        drawArrowHead(ctx, cx - 10 * s + Math.cos(arcAngle) * 22 * s, shoulderY + 15 * s + Math.sin(arcAngle) * 22 * s, arcAngle + Math.PI / 2, "#A0522D", s);
      }

      drawLabel(ctx, cx - 55 * s, ground + 35 * s, "Deep thoracic rotation", "#A0522D", s);
      drawLabel(ctx, lFootX - 20 * s, ground + 22 * s, "L leg rests", "#C0392B", s);
    }
  },

  navasana_mod: {
    name: "Modified Navasana \u2014 Press Hold",
    desc: "Standard navasana requires bilateral hip flexor \u2014 SKIP IT. This parallette press replacement fires the same abs.",
    safety: "Left hip flexor completely off. Arms and right side do all the work. Legs supported on bolster.",
    canvasHeight: 240,
    draw: (ctx, w, h, t) => {
      const s = w / REF_W;
      const cx = w / 2, ground = h * 0.82;
      drawGround(ctx, w, ground, s);

      // Parallettes — wider apart for clarity
      const pLeftX = cx - 40 * s, pRightX = cx + 40 * s;
      const pTopY = ground - 48 * s;
      drawParallette(ctx, pLeftX, pTopY, ground, s);
      drawParallette(ctx, pRightX, pTopY, ground, s);

      // Bolster — more elongated ellipse, clearly a bolster shape
      const bolsterCX = cx + 75 * s, bolsterCY = ground - 18 * s;
      ctx.fillStyle = "rgba(139, 115, 85, 0.35)";
      ctx.beginPath();
      ctx.ellipse(bolsterCX, bolsterCY, 50 * s, 14 * s, -0.05, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "rgba(139, 115, 85, 0.6)";
      ctx.lineWidth = 1.5 * s;
      ctx.stroke();
      // Bolster highlight for 3D feel
      ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
      ctx.lineWidth = 1 * s;
      ctx.beginPath();
      ctx.ellipse(bolsterCX, bolsterCY - 5 * s, 40 * s, 6 * s, -0.05, Math.PI, Math.PI * 2);
      ctx.stroke();

      // Hover pulse — more dramatic vertical oscillation
      const hover = Math.sin(t * 1.0) * 4 * s;

      // Hips clearly above the parallettes
      const hipX = cx, hipY = pTopY - 18 * s + hover;
      const shoulderX = cx - 5 * s, shoulderY = hipY - 50 * s;

      // Torso
      drawTorso(ctx, shoulderX, shoulderY, hipX, hipY, s);
      drawHead(ctx, shoulderX, shoulderY - 24 * s, s);

      // Arms pressing down onto parallettes
      drawLimb(ctx, shoulderX - 12 * s, shoulderY + 5 * s, pLeftX, pTopY, "#2D2D2D", s);
      drawLimb(ctx, shoulderX + 14 * s, shoulderY + 5 * s, pRightX, pTopY, "#2D2D2D", s);

      // Right leg (dark/active) — thigh, then shin resting on bolster
      const rKneeX = hipX + 45 * s, rKneeY = ground - 32 * s;
      const rFootX = bolsterCX + 20 * s, rFootY = bolsterCY - 14 * s;
      drawLimb(ctx, hipX + 8 * s, hipY + 2 * s, rKneeX, rKneeY, "#2D2D2D", s);
      drawLimb(ctx, rKneeX, rKneeY, rFootX, rFootY, "#2D2D2D", s);

      // Left leg (red/passive) — clearly separated, slightly lower on bolster
      const lKneeX = hipX + 38 * s, lKneeY = ground - 25 * s;
      const lFootX = bolsterCX + 10 * s, lFootY = bolsterCY - 6 * s;
      drawLimb(ctx, hipX - 2 * s, hipY + 6 * s, lKneeX, lKneeY, "#C0392B", s);
      drawLimb(ctx, lKneeX, lKneeY, lFootX, lFootY, "#C0392B", s);

      // Core activation glow around midsection — pulses with hover
      const glowAlpha = 0.1 + Math.abs(Math.sin(t * 1.0)) * 0.12;
      ctx.fillStyle = `rgba(160, 82, 45, ${glowAlpha})`;
      ctx.beginPath();
      ctx.ellipse(cx, hipY - 18 * s, 22 * s, 14 * s, 0, 0, Math.PI * 2);
      ctx.fill();

      // Labels — positioned near their referents
      drawLabel(ctx, hipX + 2 * s, hipY - 35 * s, "Hips hover", "#A0522D", s);
      drawLabel(ctx, bolsterCX, ground + 20 * s, "Legs rest on bolster", "#8B7355", s);
      drawLabel(ctx, cx - 55 * s, ground + 20 * s, "Arms press down", "#2D2D2D", s);
    }
  }
};

export const ANIMATION_ORDER = [
  "tabletop", "plank", "chaturanga", "updog", "downdog", "transition",
  "lsit", "inversion", "headstand", "cars", "dolphin", "pseudoplanche", "threadneedle", "navasana_mod"
];

// Animation groupings for the Pose Guide
export const ANIM_GROUPS = [
  { title: "Vinyasa Flow Sequence", ids: ["tabletop", "transition", "plank", "chaturanga", "updog", "downdog"] },
  { title: "Strength & Balance", ids: ["lsit", "pseudoplanche", "navasana_mod"] },
  { title: "Inversions", ids: ["headstand", "inversion"] },
  { title: "Mobility & Prep", ids: ["cars", "dolphin", "threadneedle"] },
];
