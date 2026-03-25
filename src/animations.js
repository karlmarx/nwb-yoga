// ============ Drawing Utility Functions ============

function drawGround(ctx, w, y) {
  ctx.strokeStyle = "rgba(0,0,0,0.1)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(20, y);
  ctx.lineTo(w - 20, y);
  ctx.stroke();
  ctx.fillStyle = "rgba(90, 130, 110, 0.08)";
  ctx.fillRect(40, y, w - 80, 4);
}

function drawTorso(ctx, x1, y1, x2, y2) {
  ctx.strokeStyle = "#2D2D2D";
  ctx.lineWidth = 5;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

function drawLimb(ctx, x1, y1, x2, y2, color) {
  ctx.strokeStyle = color;
  ctx.lineWidth = 4;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x2, y2, 3, 0, Math.PI * 2);
  ctx.fill();
}

function drawHead(ctx, x, y) {
  ctx.fillStyle = "#2D2D2D";
  ctx.beginPath();
  ctx.arc(x, y, 10, 0, Math.PI * 2);
  ctx.fill();
}

function drawGroundContact(ctx, x1, y, x2) {
  ctx.fillStyle = "rgba(192, 57, 43, 0.12)";
  ctx.fillRect(x1, y - 2, x2 - x1, 6);
  for (let x = x1 + 8; x < x2; x += 15) {
    ctx.fillStyle = "rgba(192, 57, 43, 0.3)";
    ctx.beginPath();
    ctx.arc(x, y + 2, 2, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawParallette(ctx, x, topY, groundY) {
  ctx.strokeStyle = "#666";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(x - 12, topY);
  ctx.lineTo(x + 12, topY);
  ctx.stroke();
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(x - 8, topY);
  ctx.lineTo(x - 10, groundY);
  ctx.moveTo(x + 8, topY);
  ctx.lineTo(x + 10, groundY);
  ctx.stroke();
}

function drawLabel(ctx, x, y, text, color) {
  ctx.font = "600 11px -apple-system, sans-serif";
  ctx.fillStyle = color;
  ctx.textAlign = "center";
  const lines = text.split("\n");
  lines.forEach((line, i) => {
    ctx.fillText(line, x, y + i * 14);
  });
}

function drawArrowHead(ctx, x, y, angle, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x + Math.cos(angle) * 6, y + Math.sin(angle) * 6);
  ctx.lineTo(x + Math.cos(angle + 2.5) * 6, y + Math.sin(angle + 2.5) * 6);
  ctx.lineTo(x + Math.cos(angle - 2.5) * 6, y + Math.sin(angle - 2.5) * 6);
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
      const cx = w / 2, ground = h * 0.78;
      drawGround(ctx, w, ground);
      const shoulderX = cx - 40, shoulderY = ground - 95;
      const hipX = cx + 30, hipY = ground - 85;
      drawTorso(ctx, shoulderX, shoulderY, hipX, hipY);
      drawHead(ctx, shoulderX - 15, shoulderY - 18);
      drawLimb(ctx, shoulderX, shoulderY, shoulderX - 15, ground, "#2D2D2D");
      drawLimb(ctx, shoulderX + 15, shoulderY + 5, shoulderX, ground, "#2D2D2D");
      drawLimb(ctx, hipX, hipY, hipX + 10, ground, "#2D2D2D");
      drawLimb(ctx, hipX + 10, ground, hipX - 5, ground + 2, "#2D2D2D");
      const leftKneeX = hipX + 55, leftFootX = hipX + 115;
      drawLimb(ctx, hipX, hipY, leftKneeX, ground - 3, "#C0392B");
      drawLimb(ctx, leftKneeX, ground - 3, leftFootX, ground - 1, "#C0392B");
      drawGroundContact(ctx, leftKneeX, ground, leftFootX, ground);
      drawLabel(ctx, leftFootX - 30, ground + 25, "Left leg rests on mat", "#C0392B");
      drawLabel(ctx, shoulderX - 10, ground + 25, "Hands + R knee = base", "#2D2D2D");
    }
  },

  plank: {
    name: "Plank (NWB)",
    desc: "Right foot is your only ground contact for legs. Left shin/top-of-foot drags on the mat.",
    safety: "One-footed plank. Left leg is dead weight on the floor. Harder on core \u2014 that's the point.",
    canvasHeight: 220,
    draw: (ctx, w, h, t) => {
      const cx = w / 2, ground = h * 0.78;
      drawGround(ctx, w, ground);
      const shoulderX = cx - 70, shoulderY = ground - 80;
      const hipX = cx + 20, hipY = ground - 65;
      drawTorso(ctx, shoulderX, shoulderY, hipX, hipY);
      drawHead(ctx, shoulderX - 15, shoulderY - 16);
      drawLimb(ctx, shoulderX, shoulderY, shoulderX - 5, ground, "#2D2D2D");
      drawLimb(ctx, shoulderX + 18, shoulderY + 3, shoulderX + 12, ground, "#2D2D2D");
      const rFootX = hipX + 80;
      drawLimb(ctx, hipX, hipY, hipX + 40, ground - 35, "#2D2D2D");
      drawLimb(ctx, hipX + 40, ground - 35, rFootX, ground, "#2D2D2D");
      ctx.fillStyle = "#2D2D2D";
      ctx.beginPath();
      ctx.arc(rFootX, ground - 2, 4, 0, Math.PI * 2);
      ctx.fill();
      const lKneeX = hipX + 50, lFootX = hipX + 110;
      drawLimb(ctx, hipX, hipY, lKneeX, ground - 4, "#C0392B");
      drawLimb(ctx, lKneeX, ground - 4, lFootX, ground - 1, "#C0392B");
      drawGroundContact(ctx, lKneeX - 10, ground, lFootX, ground);
      drawLabel(ctx, rFootX - 15, ground + 25, "R foot active", "#2D2D2D");
      drawLabel(ctx, lFootX - 40, ground + 42, "L leg = sandbag on mat", "#C0392B");
    }
  },

  chaturanga: {
    name: "Chaturanga (NWB)",
    desc: "Lower from plank. Right foot stays, left leg slides down with you. Elbows hug ribs.",
    safety: "This is just a one-footed push-up. Left leg is along for the ride.",
    canvasHeight: 220,
    draw: (ctx, w, h, t) => {
      const cx = w / 2, ground = h * 0.78;
      drawGround(ctx, w, ground);
      const shoulderX = cx - 70, shoulderY = ground - 45;
      const hipX = cx + 20, hipY = ground - 38;
      drawTorso(ctx, shoulderX, shoulderY, hipX, hipY);
      drawHead(ctx, shoulderX - 12, shoulderY - 14);
      const elbowY = shoulderY + 5;
      drawLimb(ctx, shoulderX, shoulderY, shoulderX + 2, elbowY + 15, "#2D2D2D");
      drawLimb(ctx, shoulderX + 2, elbowY + 15, shoulderX - 5, ground, "#2D2D2D");
      drawLimb(ctx, shoulderX + 18, shoulderY + 2, shoulderX + 20, elbowY + 17, "#2D2D2D");
      drawLimb(ctx, shoulderX + 20, elbowY + 17, shoulderX + 13, ground, "#2D2D2D");
      const rFootX = hipX + 82;
      drawLimb(ctx, hipX, hipY, hipX + 42, ground - 22, "#2D2D2D");
      drawLimb(ctx, hipX + 42, ground - 22, rFootX, ground, "#2D2D2D");
      ctx.fillStyle = "#2D2D2D";
      ctx.beginPath();
      ctx.arc(rFootX, ground - 2, 4, 0, Math.PI * 2);
      ctx.fill();
      const lKneeX = hipX + 50, lFootX = hipX + 110;
      drawLimb(ctx, hipX, hipY, lKneeX, ground - 3, "#C0392B");
      drawLimb(ctx, lKneeX, ground - 3, lFootX, ground - 1, "#C0392B");
      drawGroundContact(ctx, lKneeX - 10, ground, lFootX, ground);
      ctx.strokeStyle = "rgba(0,0,0,0.25)";
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 3]);
      ctx.beginPath();
      ctx.moveTo(cx - 20, shoulderY - 35);
      ctx.lineTo(cx - 20, shoulderY - 12);
      ctx.stroke();
      ctx.setLineDash([]);
      drawArrowHead(ctx, cx - 20, shoulderY - 12, Math.PI / 2, "rgba(0,0,0,0.25)");
      drawLabel(ctx, cx - 50, shoulderY - 45, "Lower together", "rgba(0,0,0,0.4)");
      drawLabel(ctx, lFootX - 40, ground + 25, "L leg slides with you", "#C0392B");
    }
  },

  updog: {
    name: "Up-Dog (NWB)",
    desc: "Press up. Chest lifts, hips sag toward mat. Right foot top-down, left leg rests on mat.",
    safety: "Hip EXTENSION, not flexion. Left leg is completely passive \u2014 gravity + the mat do all the work.",
    canvasHeight: 220,
    draw: (ctx, w, h, t) => {
      const cx = w / 2, ground = h * 0.78;
      drawGround(ctx, w, ground);
      const shoulderX = cx - 55, shoulderY = ground - 90;
      const hipX = cx + 30, hipY = ground - 25;
      ctx.strokeStyle = "#2D2D2D";
      ctx.lineWidth = 5;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(shoulderX, shoulderY);
      ctx.quadraticCurveTo(cx, ground - 80, hipX, hipY);
      ctx.stroke();
      drawHead(ctx, shoulderX - 8, shoulderY - 22);
      drawLimb(ctx, shoulderX, shoulderY, shoulderX - 8, ground, "#2D2D2D");
      drawLimb(ctx, shoulderX + 20, shoulderY + 15, shoulderX + 12, ground, "#2D2D2D");
      const rFootX = hipX + 75;
      drawLimb(ctx, hipX, hipY, hipX + 38, ground - 12, "#2D2D2D");
      drawLimb(ctx, hipX + 38, ground - 12, rFootX, ground, "#2D2D2D");
      const lFootX = hipX + 110;
      drawLimb(ctx, hipX, hipY, hipX + 55, ground - 5, "#C0392B");
      drawLimb(ctx, hipX + 55, ground - 5, lFootX, ground - 1, "#C0392B");
      drawGroundContact(ctx, hipX + 40, ground, lFootX, ground);
      drawLabel(ctx, shoulderX - 20, shoulderY - 35, "Chest lifts", "#2D2D2D");
      drawLabel(ctx, lFootX - 40, ground + 25, "L leg rests fully", "#C0392B");
    }
  },

  downdog: {
    name: "One-Legged Down-Dog",
    desc: "Only right foot is pressing. Left leg floats behind in hip extension (glute holds it, NOT hip flexor).",
    safety: "Left leg extends BEHIND you \u2014 that's hip extension via glutes. Hip flexors are completely off.",
    canvasHeight: 220,
    draw: (ctx, w, h, t) => {
      const cx = w / 2, ground = h * 0.78;
      drawGround(ctx, w, ground);
      const handX = cx - 70, handY = ground;
      const hipX = cx, hipY = ground - 110;
      const footX = cx + 50, footY = ground;
      drawLimb(ctx, handX + 10, handY - 2, hipX, hipY, "#2D2D2D");
      drawHead(ctx, handX + 5, handY - 25);
      drawLimb(ctx, handX + 5, handY - 15, handX - 5, ground, "#2D2D2D");
      drawLimb(ctx, handX + 18, handY - 10, handX + 12, ground, "#2D2D2D");
      drawLimb(ctx, hipX, hipY, hipX + 25, ground - 55, "#2D2D2D");
      drawLimb(ctx, hipX + 25, ground - 55, footX, ground, "#2D2D2D");
      ctx.fillStyle = "#2D2D2D";
      ctx.beginPath();
      ctx.arc(footX, ground - 2, 4, 0, Math.PI * 2);
      ctx.fill();
      const breath = Math.sin(t * 0.8) * 5;
      const lKneeX = hipX + 40, lKneeY = hipY - 15 + breath;
      const lFootX = hipX + 85, lFootY = hipY - 5 + breath;
      drawLimb(ctx, hipX, hipY, lKneeX, lKneeY, "#C0392B");
      drawLimb(ctx, lKneeX, lKneeY, lFootX, lFootY, "#C0392B");
      ctx.fillStyle = "rgba(46, 139, 87, 0.25)";
      ctx.beginPath();
      ctx.arc(hipX + 8, hipY + 5, 14, 0, Math.PI * 2);
      ctx.fill();
      drawLabel(ctx, hipX + 5, hipY + 35, "Glute holds leg up", "#2E8B57");
      drawLabel(ctx, lFootX - 10, lFootY - 18, "L leg: hip EXTENSION", "#C0392B");
      drawLabel(ctx, footX - 10, ground + 25, "R foot only", "#2D2D2D");
    }
  },

  transition: {
    name: "The Drag Transition",
    desc: "Tabletop \u2192 Plank: Right foot steps back while left shin drags along the mat surface.",
    safety: "Not graceful. Not supposed to be. The drag keeps left hip flexor at zero.",
    canvasHeight: 220,
    draw: (ctx, w, h, t) => {
      const cx = w / 2, ground = h * 0.78;
      drawGround(ctx, w, ground);
      const phase = (Math.sin(t * 0.6) + 1) / 2;
      const shoulderX = cx - 50 - phase * 20;
      const shoulderY = ground - 80 - phase * 5;
      const hipX = cx + 20;
      const hipY = ground - 70 - phase * 2;
      drawTorso(ctx, shoulderX, shoulderY, hipX, hipY);
      drawHead(ctx, shoulderX - 14, shoulderY - 16);
      drawLimb(ctx, shoulderX, shoulderY, shoulderX - 5, ground, "#2D2D2D");
      drawLimb(ctx, shoulderX + 18, shoulderY + 3, shoulderX + 12, ground, "#2D2D2D");
      const rKneeX = hipX + 15 + phase * 30;
      const rKneeY = ground - 10 - phase * 25;
      const rFootX = hipX + 40 + phase * 45;
      const rFootY = ground;
      drawLimb(ctx, hipX, hipY, rKneeX, rKneeY, "#2D2D2D");
      drawLimb(ctx, rKneeX, rKneeY, rFootX, rFootY, "#2D2D2D");
      const lKneeX = hipX + 30 + phase * 25;
      const lFootX = hipX + 75 + phase * 35;
      drawLimb(ctx, hipX, hipY, lKneeX, ground - 3, "#C0392B");
      drawLimb(ctx, lKneeX, ground - 3, lFootX, ground - 1, "#C0392B");
      drawGroundContact(ctx, lKneeX - 15, ground, lFootX, ground);
      ctx.strokeStyle = "#C0392B88";
      ctx.lineWidth = 1.5;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(lFootX - 30, ground + 15);
      ctx.lineTo(lFootX + 10, ground + 15);
      ctx.stroke();
      ctx.setLineDash([]);
      drawArrowHead(ctx, lFootX + 10, ground + 15, 0, "#C0392B88");
      drawLabel(ctx, lFootX - 35, ground + 35, "L leg drags along", "#C0392B");
      drawLabel(ctx, rFootX - 25, rFootY + 50, "R foot steps back", "#2D2D2D");
    }
  },

  lsit: {
    name: "R-Leg L-Sit (Parallettes)",
    desc: "Right leg extends actively. Left leg hangs completely passive \u2014 gravity pulls it down.",
    safety: "Right hip flexor works hard. Left hip flexor does NOTHING \u2014 left leg hangs like a pendulum.",
    canvasHeight: 220,
    draw: (ctx, w, h, t) => {
      const cx = w / 2, ground = h * 0.82;
      drawGround(ctx, w, ground);
      const pLeftX = cx - 28, pRightX = cx + 28;
      const pTopY = ground - 50;
      drawParallette(ctx, pLeftX, pTopY, ground);
      drawParallette(ctx, pRightX, pTopY, ground);
      const hipX = cx, hipY = pTopY - 15;
      const shoulderX = cx, shoulderY = hipY - 50;
      drawTorso(ctx, shoulderX, shoulderY, hipX, hipY);
      drawHead(ctx, shoulderX, shoulderY - 22);
      drawLimb(ctx, shoulderX - 12, shoulderY + 5, pLeftX, pTopY, "#2D2D2D");
      drawLimb(ctx, shoulderX + 12, shoulderY + 5, pRightX, pTopY, "#2D2D2D");
      const rKneeX = hipX + 30, rKneeY = hipY + 5;
      const rFootX = hipX + 75, rFootY = hipY;
      drawLimb(ctx, hipX + 5, hipY, rKneeX, rKneeY, "#2D2D2D");
      drawLimb(ctx, rKneeX, rKneeY, rFootX, rFootY, "#2D2D2D");
      ctx.fillStyle = "rgba(45, 45, 45, 0.15)";
      ctx.beginPath();
      ctx.arc(hipX + 10, hipY - 3, 12, 0, Math.PI * 2);
      ctx.fill();
      const sway = Math.sin(t * 0.5) * 3;
      const lKneeX = hipX - 5 + sway, lKneeY = hipY + 40;
      const lFootX = hipX - 8 + sway * 1.3, lFootY = hipY + 75;
      drawLimb(ctx, hipX - 5, hipY, lKneeX, lKneeY, "#C0392B");
      drawLimb(ctx, lKneeX, lKneeY, lFootX, lFootY, "#C0392B");
      drawLabel(ctx, rFootX - 5, rFootY - 18, "R leg: active", "#2D2D2D");
      drawLabel(ctx, lFootX - 35, lFootY + 18, "L leg: hangs", "#C0392B");
      ctx.strokeStyle = "#C0392B55";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(lFootX, lFootY + 5);
      ctx.lineTo(lFootX, lFootY + 22);
      ctx.stroke();
      drawArrowHead(ctx, lFootX, lFootY + 22, Math.PI / 2, "#C0392B55");
    }
  },

  inversion: {
    name: "FeetUp Headstand \u2014 Leg Lowers",
    desc: "Inverted: lowering a leg toward floor is HIP EXTENSION work (glutes/hamstrings control it). Hip flexors are OFF.",
    safety: "Gravity reversal: what looks like 'flexion' is actually controlled by extensors. Your hip flexors are passengers.",
    canvasHeight: 300,
    draw: (ctx, w, h, t) => {
      const cx = w / 2, ground = h * 0.85;
      drawGround(ctx, w, ground);
      // FeetUp chair base
      ctx.fillStyle = "#8B7355";
      ctx.fillRect(cx - 40, ground - 10, 80, 10);
      ctx.fillRect(cx - 35, ground - 55, 70, 45);
      ctx.fillStyle = "#A0926B";
      ctx.fillRect(cx - 30, ground - 50, 60, 35);
      // body inverted
      const headY = ground - 55;
      const shoulderY = headY - 25;
      const hipY = shoulderY - 60;
      drawHead(ctx, cx, headY - 5);
      drawTorso(ctx, cx, shoulderY, cx, hipY);
      // arms gripping handles
      drawLimb(ctx, cx - 10, shoulderY, cx - 30, ground - 48, "#2D2D2D");
      drawLimb(ctx, cx + 10, shoulderY, cx + 30, ground - 48, "#2D2D2D");
      // RIGHT leg - straight up
      drawLimb(ctx, cx + 3, hipY, cx + 5, hipY - 45, "#2D2D2D");
      drawLimb(ctx, cx + 5, hipY - 45, cx + 6, hipY - 85, "#2D2D2D");
      // LEFT leg - lowering forward (toward front of body)
      const lowerAmt = (Math.sin(t * 0.5) + 1) / 2;
      const lAngle = -Math.PI / 2 + lowerAmt * (Math.PI / 3);
      const lKneeX = cx - 3 + Math.cos(lAngle) * 42;
      const lKneeY = hipY + Math.sin(lAngle) * 42;
      const lFootX = cx - 3 + Math.cos(lAngle) * 82;
      const lFootY = hipY + Math.sin(lAngle) * 82;
      drawLimb(ctx, cx - 3, hipY, lKneeX, lKneeY, "#C0392B");
      drawLimb(ctx, lKneeX, lKneeY, lFootX, lFootY, "#C0392B");
      // glute activation indicator
      ctx.fillStyle = "rgba(46, 139, 87, 0.3)";
      ctx.beginPath();
      ctx.arc(cx - 5, hipY + 8, 14, 0, Math.PI * 2);
      ctx.fill();
      drawLabel(ctx, cx + 25, hipY - 75, "R leg: gravity holds", "#2D2D2D");
      drawLabel(ctx, cx - 100, hipY + 5, "Glute/ham controls\nthe lowering", "#2E8B57");
      drawLabel(ctx, lFootX + 15, lFootY, "L leg: extensors\nwork eccentrically", "#C0392B");
    }
  }
};

export const ANIMATION_ORDER = [
  "tabletop", "plank", "chaturanga", "updog", "downdog", "transition", "lsit", "inversion"
];
