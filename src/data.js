export const TIERS = [
  {
    id: "prana",
    name: "Prana",
    duration: "25 min",
    subtitle: "Breath & Restore",
    color: "#5B7B6F",
    description: "Pranayama-heavy, gentle mobility, supported inversions. For recovery days or when energy is low.",
    sections: [
      {
        title: "Opening",
        time: "3 min",
        poses: [
          { name: "Sukhasana / Virasana on bolster", sanskrit: "", hold: "1 min", breath: "Natural", notes: "Sit tall. Bolster under hips for virasana if knees allow.", props: "Bolster" },
          { name: "Opening Mantra", sanskrit: "Vande Gurunam", hold: "1 min", breath: "\u2014", notes: "Full ashtanga opening if desired.", props: "" },
          { name: "Set Intention", sanskrit: "", hold: "1 min", breath: "Ujjayi", notes: "Eyes closed. Bring awareness to the practice constraints \u2014 left leg is passive today.", props: "" },
        ]
      },
      {
        title: "Pranayama",
        time: "8 min",
        poses: [
          { name: "Kapalabhati", sanskrit: "Skull-Shining Breath", hold: "3 rounds \u00d7 30", breath: "Sharp exhale, passive inhale", notes: "Diaphragm-driven. No hip flexor involvement. Build heat from the inside.", props: "" },
          { name: "Nadi Shodhana", sanskrit: "Alternate Nostril", hold: "5 min", breath: "4:16:8 ratio", notes: "Vishnu mudra. Progress ratio as comfortable. This is your nervous system reset.", props: "" },
          { name: "Ujjayi Establishment", sanskrit: "", hold: "1 min", breath: "Ujjayi", notes: "Oceanic breath. Carry this through the remainder.", props: "" },
        ]
      },
      {
        title: "Gentle Mobility",
        time: "7 min",
        poses: [
          { name: "Seated Cat-Cow", sanskrit: "", hold: "8 rounds", breath: "Inhale extend, exhale round", notes: "Hands on knees. Fluid spinal articulation.", props: "" },
          { name: "Seated Side Bends", sanskrit: "Parsva Sukhasana", hold: "5 breaths / side", breath: "Inhale lengthen, exhale deepen", notes: "Right hand to floor, left arm overhead. Both sides.", props: "Block" },
          { name: "Gomukhasana Arms", sanskrit: "Cow Face Arms", hold: "5 breaths / side", breath: "Steady ujjayi", notes: "Use strap if fingers don't clasp. Focus on thoracic opening.", props: "Strap" },
          { name: "Garudasana Arms", sanskrit: "Eagle Arms", hold: "5 breaths / side", breath: "Steady ujjayi", notes: "Elbows at shoulder height. Lift elbows on inhale for deeper stretch.", props: "" },
          { name: "Baddha Konasana", sanskrit: "Bound Angle", hold: "1 min", breath: "Natural", notes: "Bolsters under both knees. Passive hip opening \u2014 let gravity work.", props: "2\u00d7 Bolster" },
          { name: "Supta Baddha Konasana", sanskrit: "Reclined Bound Angle", hold: "2 min", breath: "Natural", notes: "Bolster lengthwise under spine. Bolster/blocks under knees. Full surrender.", props: "Bolster, Blocks" },
        ]
      },
      {
        title: "Supported Inversions \u2014 FeetUp Trainer",
        time: "5 min",
        poses: [
          {
            name: "Supported Sirsasana", sanskrit: "Headstand", hold: "3\u20135 min", breath: "Slow, steady ujjayi",
            notes: "Entry: (1) grip handles, tuck RIGHT knee to chest, press up with right leg. (2) Extend right leg to ceiling using right hip flexor. (3) Reach down with ONE HAND and physically lift/guide the left leg into position \u2014 no momentum, no swinging. (4) Re-grip handles once both legs are vertical. Once inverted, both legs are gravity-held \u2014 zero hip flexor demand. Explore: straddle (30s), diamond/baddha konasana legs (30s), straight (remainder).",
            props: "FeetUp Trainer", safety: "Entry uses HAND to guide left leg \u2014 never kick or swing. Momentum = involuntary hip flexor burst.",
            animations: ["headstand"]
          },
        ]
      },
      {
        title: "Closing",
        time: "2 min",
        poses: [
          { name: "Savasana", sanskrit: "Corpse Pose", hold: "2 min", breath: "Natural", notes: "Bolster under right knee. Left leg extended on bolster for comfort. Full release.", props: "Bolster" },
          { name: "Closing Mantra", sanskrit: "", hold: "\u2014", breath: "\u2014", notes: "Svasthi prajabhyah... or simply three Om.", props: "" },
        ]
      }
    ]
  },
  {
    id: "tapas",
    name: "Tapas",
    duration: "45 min",
    subtitle: "Strength & Flow",
    color: "#A0522D",
    description: "Upper body vinyasa, parallette work, inversions, and seated flexibility. Your standard daily practice.",
    sections: [
      {
        title: "Opening & Pranayama",
        time: "8 min",
        poses: [
          { name: "Opening Mantra + Intention", sanskrit: "", hold: "1 min", breath: "Natural", notes: "", props: "" },
          { name: "Kapalabhati", sanskrit: "", hold: "3 rounds \u00d7 50", breath: "Sharp exhale", notes: "Build internal fire.", props: "" },
          { name: "Nadi Shodhana", sanskrit: "", hold: "4 min", breath: "4:16:8", notes: "Full ratio work.", props: "" },
          { name: "Bhastrika", sanskrit: "Bellows Breath", hold: "2 rounds \u00d7 20", breath: "Forceful in/out", notes: "Energizing. Arms can pump overhead for added intensity.", props: "" },
        ]
      },
      {
        title: "Warm-Up & Wrist Prep",
        time: "5 min",
        poses: [
          { name: "Seated Cat-Cow", sanskrit: "", hold: "8 rounds", breath: "Linked", notes: "", props: "" },
          { name: "Seated Twists", sanskrit: "", hold: "5 breaths / side", breath: "Inhale tall, exhale rotate", notes: "Hand to opposite knee, other hand behind.", props: "" },
          { name: "Shoulder CARs", sanskrit: "", hold: "5 / direction / arm", breath: "Steady", notes: "Controlled Articular Rotations: slowly trace the largest possible circle with your arm through its full range of motion. Maximal tension throughout. Like trying to push the walls of a tube outward while your arm traces the circle. Essential for shoulder joint health and mobility mapping.", props: "", animations: ["cars"] },
          { name: "Wrist Warm-Up Sequence", sanskrit: "", hold: "2 min", breath: "Natural", notes: "Fingers-forward press, fingers-back press, prayer stretches, fist rotations. ESSENTIAL prep for parallette work.", props: "" },
        ]
      },
      {
        title: "Modified Floor Vinyasa",
        time: "8 min",
        poses: [
          {
            name: "Modified Surya Namaskara", sanskrit: "Sun Salutation", hold: "5 rounds", breath: "One breath per movement",
            notes: "Flow: Seated arms up \u2192 hands to blocks \u2192 tabletop (RIGHT knee down, left leg extended back passively) \u2192 plank (left leg resting on mat) \u2192 Chaturanga \u2192 Urdhva Mukha (NWB up-dog: left thigh/shin/foot ALL stay on mat \u2014 right side does up-dog, left side does lazy cobra. Backbend from arms + thoracic extension) \u2192 Adho Mukha one-legged (right foot only, left leg extended behind via glutes) \u2192 tabletop \u2192 seated. Build heat with ujjayi. Wear pants/leggings that slide easily on the mat \u2014 if the left leg catches on a sticky surface, there's a reflexive tendency to give it a hip flexor tug.",
            props: "Blocks", safety: "Left leg stays passive throughout. No active left hip flexor at any point. Let the left leg drag/rest. Smooth-fabric leg covering recommended.",
            animations: ["tabletop", "transition", "plank", "chaturanga", "updog", "downdog"]
          },
          { name: "Dolphin Pose Holds", sanskrit: "", hold: "5 breaths \u00d7 3", breath: "Ujjayi", notes: "Forearms down, hips high. Right foot pressing, left leg extended behind in hip extension (glute holds it). Massive shoulder and core work.", props: "", animations: ["dolphin"] },
          { name: "Thread the Needle", sanskrit: "", hold: "5 breaths / side", breath: "Exhale to thread", notes: "From tabletop on right knee, left leg extended. Thread one arm under the other for deep thoracic rotation. Zero hip flexor involvement.", props: "", animations: ["threadneedle"] },
        ]
      },
      {
        title: "Parallette Strength Series",
        time: "10 min",
        poses: [
          { name: "Parallette Push-Ups", sanskrit: "", hold: "3 \u00d7 10", breath: "Exhale press", notes: "Full depth. Left leg rests on mat passively. Enjoy the extra range parallettes give you.", props: "Parallettes" },
          { name: "Archer Push-Ups", sanskrit: "", hold: "3 \u00d7 5 / side", breath: "Exhale press", notes: "One arm wide on parallette, one arm bends. Unilateral strength beast.", props: "Parallettes" },
          { name: "Parallette Plank Hold", sanskrit: "", hold: "60s", breath: "Steady ujjayi", notes: "Hollow body. Active right foot, left leg passive.", props: "Parallettes" },
          { name: "Shoulder Taps", sanskrit: "", hold: "3 \u00d7 10", breath: "Exhale tap", notes: "From plank on parallettes. Anti-rotation core work.", props: "Parallettes" },
          {
            name: "Right-Leg L-Sit", sanskrit: "", hold: "3 \u00d7 15\u201320s", breath: "Steady",
            notes: "RIGHT leg actively extended via right hip flexor. Left leg hangs passively or rests on a block below. Lats, triceps, right side screaming.",
            props: "Parallettes", safety: "Left leg HANGS. No left hip flexor activation.",
            animations: ["lsit"]
          },
          {
            name: "Pseudo-Planche Push-Ups", sanskrit: "", hold: "3 \u00d7 8", breath: "Exhale press",
            notes: "Hands on parallettes, lean forward past wrists until feet feel light. Push up from this forward-shifted position. Massive anterior delt and chest stimulus \u2014 same pressing chain as crow without any hip flexor demand.",
            props: "Parallettes", safety: "Zero hip flexor involvement. Feet and left leg stay on mat throughout.",
            animations: ["pseudoplanche"]
          },
        ]
      },
      {
        title: "FeetUp Inversion Series",
        time: "8 min",
        poses: [
          {
            name: "Supported Sirsasana", sanskrit: "Headstand", hold: "3 min", breath: "Slow ujjayi",
            notes: "Same hand-guided entry as Tier 1 (no momentum \u2014 physically lift left leg with one hand). Once up: straight hold (1 min) \u2192 straddle (30s) \u2192 eagle legs (30s) \u2192 diamond (30s).",
            props: "FeetUp Trainer", safety: "Entry uses HAND to guide left leg \u2014 never kick or swing.",
            animations: ["headstand"]
          },
          {
            name: "Inverted Leg Lowers", sanskrit: "", hold: "5 / leg, slow", breath: "Exhale to lower",
            notes: "Lower ONE leg toward floor (front of body), then raise back. This is HIP EXTENSOR work \u2014 glutes/hamstrings control the descent against gravity. Hip flexors are passive. Incredible core + posterior chain.",
            props: "FeetUp Trainer", safety: "Despite lowering the leg, hip FLEXORS are not the prime movers in inversion. Glutes and hamstrings eccentrically control. Safe for the stress fracture constraint.",
            animations: ["inversion"]
          },
          { name: "Supported Sarvangasana", sanskrit: "Shoulderstand", hold: "2 min", breath: "Natural", notes: "On bolster or using FeetUp. Quiet the nervous system.", props: "FeetUp Trainer or Bolster" },
        ]
      },
      {
        title: "Seated Flexibility",
        time: "6 min",
        poses: [
          { name: "Janu Sirsasana A", sanskrit: "Head-to-Knee", hold: "5 breaths / side", breath: "Inhale lengthen, exhale fold", notes: "One leg extended, other folded. Left leg positioned passively when folded.", props: "Strap", safety: "Hip flexion approaches 90\u00b0+ in the forward fold. Your call on depth \u2014 the labral tears are in the anterosuperior zone that gets loaded here." },
          { name: "Paschimattanasana", sanskrit: "Seated Forward Fold", hold: "8 breaths", breath: "Extend on inhale, deepen on exhale", notes: "Both legs extended. Classic primary series hold. Use strap around feet if needed.", props: "Strap" },
          { name: "Ardha Matsyendrasana", sanskrit: "Half Lord of the Fishes", hold: "5 breaths / side", breath: "Inhale tall, exhale twist", notes: "Seated twist. Foot placement passive for left side.", props: "" },
          { name: "Gomukhasana", sanskrit: "Cow Face \u2014 Full", hold: "5 breaths / side", breath: "Steady", notes: "Legs stacked (position left leg passively by hand), full arm bind with strap.", props: "Strap" },
        ]
      },
      {
        title: "Closing",
        time: "5 min",
        poses: [
          { name: "Supported Matsyasana", sanskrit: "Fish Pose", hold: "1 min", breath: "Open, expansive", notes: "Bolster lengthwise under thoracic spine. Arms wide. Heart opener after all that forward work.", props: "Bolster" },
          { name: "Supta Parivrtta", sanskrit: "Supine Twist", hold: "5 breaths / side", breath: "Exhale to deepen", notes: "Knees stacked, arms wide. Passive spinal rotation.", props: "" },
          { name: "Savasana", sanskrit: "", hold: "3 min", breath: "Release all technique", notes: "Bolster under knees. Full integration.", props: "Bolster" },
          { name: "Closing Mantra", sanskrit: "", hold: "\u2014", breath: "\u2014", notes: "", props: "" },
        ]
      }
    ]
  },
  {
    id: "agni",
    name: "Agni",
    duration: "70 min",
    subtitle: "Full Practice \u2014 Push the Edge",
    color: "#8B2500",
    description: "Ashtanga-inspired full session. Comprehensive pranayama, aggressive parallette series, deep inversion work, primary series adaptations. This is where you live.",
    sections: [
      {
        title: "Opening & Pranayama",
        time: "10 min",
        poses: [
          { name: "Full Opening Mantra", sanskrit: "Vande Gurunam", hold: "2 min", breath: "\u2014", notes: "Complete. Set the container.", props: "" },
          { name: "Kapalabhati", sanskrit: "", hold: "3 rounds \u00d7 80\u2013100", breath: "Aggressive exhale", notes: "This is your fire-starter. Full abdominal engagement.", props: "" },
          { name: "Bhastrika", sanskrit: "", hold: "3 rounds \u00d7 20", breath: "Forceful both ways", notes: "Arms pump overhead. Energizing.", props: "" },
          { name: "Nadi Shodhana", sanskrit: "", hold: "5 min", breath: "5:20:10 if accessible", notes: "Advanced ratio. Pure concentration.", props: "" },
        ]
      },
      {
        title: "Warm-Up",
        time: "5 min",
        poses: [
          { name: "Seated Cat-Cow \u2192 Side Bends \u2192 Twists", sanskrit: "", hold: "5 each", breath: "Linked", notes: "Flowing sequence. Wake the spine.", props: "" },
          { name: "Shoulder CARs + Scapular Push-Ups", sanskrit: "", hold: "5 each", breath: "Controlled", notes: "CARs: slowly trace the largest circle with each arm \u2014 maximal tension throughout, like pushing the walls of a tube. Then scapular push-ups: protract/retract shoulder blades in plank. Full shoulder prep.", props: "", animations: ["cars"] },
          { name: "Extensive Wrist Warm-Up", sanskrit: "", hold: "3 min", breath: "Natural", notes: "You're about to load your wrists hard. Fingers forward, fingers back, prayer, fist rotations, wrist circles on floor. Don't skip this.", props: "" },
        ]
      },
      {
        title: "Modified Surya Namaskara \u2014 Power Rounds",
        time: "10 min",
        poses: [
          {
            name: "Modified Surya A", sanskrit: "", hold: "5 rounds", breath: "One breath per movement",
            notes: "Same NWB flow as Tier 2 but at PACE. Seated \u2192 blocks \u2192 tabletop (R knee) \u2192 plank \u2192 chaturanga \u2192 NWB up-dog (left thigh stays on mat) \u2192 one-leg down-dog \u2192 tabletop \u2192 seated. Build ujjayi heat. Wear sliding-fabric pants to prevent left leg catching on sticky mat.",
            props: "Blocks", safety: "Left leg always passive/trailing. Smooth-fabric leg covering recommended.",
            animations: ["tabletop", "transition", "plank", "chaturanga", "updog", "downdog"]
          },
          { name: "Modified Surya B Addition", sanskrit: "", hold: "3 rounds", breath: "Linked", notes: "Add: right-knee Virabhadrasana I arms (high lunge on right knee, left leg extended back) \u2192 Vinyasa \u2192 repeat. It's a kneeling warrior I, not standing \u2014 but it builds serious heat when linked.", props: "Blocks" },
          { name: "Dolphin Push-Ups", sanskrit: "", hold: "3 \u00d7 8", breath: "Exhale press", notes: "Forearm plank to dolphin and back. Right foot pressing, left leg extended behind. Shoulder destroyer.", props: "", animations: ["dolphin"] },
        ]
      },
      {
        title: "Parallette Power Series \u2014 Advanced",
        time: "15 min",
        poses: [
          { name: "Push-Up Complex", sanskrit: "", hold: "3 rounds", breath: "Exhale press", notes: "5 standard + 5 wide + 5 diamond + 5 pike = 1 round. No rest between grips. 30s between rounds.", props: "Parallettes" },
          { name: "Archer Push-Ups", sanskrit: "", hold: "3 \u00d7 5 / side", breath: "Exhale press", notes: "Full lateral extension on the straight arm. Unilateral pressing power.", props: "Parallettes" },
          {
            name: "Right-Leg L-Sit \u2014 Max Holds", sanskrit: "", hold: "3 \u00d7 max", breath: "Steady",
            notes: "Right leg active, left hangs. Try to beat your time each set. These build absurd lat and tricep endurance.",
            props: "Parallettes",
            animations: ["lsit"]
          },
          {
            name: "Pseudo-Planche Push-Ups \u2014 Advanced", sanskrit: "", hold: "3 \u00d7 10", breath: "Exhale press",
            notes: "Deeper lean than Tier 2. Hands on parallettes, lean forward until shoulders are well past wrists. Push up from this extreme forward position. Builds toward planche.",
            props: "Parallettes", safety: "Zero hip flexor involvement. Feet and left leg rest on mat.",
            animations: ["pseudoplanche"]
          },
          {
            name: "Side Plank Variations", sanskrit: "", hold: "3 \u00d7 20s / side", breath: "Steady",
            notes: "Right foot on ground, left leg resting on top of right or on the mat. On parallette for wrist relief. Explore: top arm reaches to ceiling, thread-through, hip dips. Oblique and shoulder stabilizer work.",
            props: "Parallettes", safety: "Zero hip flexor demand. Left leg is passive throughout."
          },
          {
            name: "Planche Leans \u2192 Straddle Planche", sanskrit: "", hold: "5 \u00d7 10s lean, then explore", breath: "Steady",
            notes: "Lean forward past wrists, feet light. Straddle planche ONLY \u2014 legs wide via gravity + adductors. Hip flexors have no role in straddle position.",
            props: "Parallettes", safety: "CONTRAINDICATED: tuck planche requires bilateral hip flexor isometric hold (same mechanism as crow). Straddle only."
          },
          { name: "Purvottanasana on Parallettes", sanskrit: "Reverse Plank", hold: "3 \u00d7 15s", breath: "Open chest, exhale hold", notes: "Hands on parallettes behind you, right foot pressing, left leg extended and resting. Massive anterior chain opener and posterior chain strengthener. Zero hip flexor.", props: "Parallettes" },
        ]
      },
      {
        title: "FeetUp Inversion Series \u2014 Extended",
        time: "12 min",
        poses: [
          {
            name: "Supported Sirsasana \u2014 5-Minute Hold", sanskrit: "Headstand", hold: "5 min", breath: "Slow, meditative ujjayi",
            notes: "Hand-guided entry (no momentum). Your inversion palace. Minute 1: straight. Minute 2: straddle + diamond. Minute 3: eagle legs + figure-4. Minute 4: slow single-leg lowers (5/leg \u2014 remember, this is hip EXTENSOR work, not flexor). Minute 5: return to stillness.",
            props: "FeetUp Trainer", safety: "Entry uses HAND to guide left leg \u2014 never kick or swing.",
            animations: ["headstand", "inversion"]
          },
          { name: "Pincha Mayurasana", sanskrit: "Forearm Stand", hold: "2 min total", breath: "Steady", notes: "Use the FeetUp for support. Forearms on the seat, shoulder-width. Walk in, lift. If you can free-balance for moments, do it. The trainer catches you.", props: "FeetUp Trainer" },
          { name: "Inversion \u2192 Transition \u2192 Rest", sanskrit: "", hold: "30s rest", breath: "Natural", notes: "Come down. Rest in supported child's pose (right knee only, left extended).", props: "" },
          { name: "Supported Sarvangasana", sanskrit: "Shoulderstand", hold: "3 min", breath: "Natural", notes: "Bolster under sacrum for support. Or use FeetUp. Legs straight up, then explore straddle and variations. Parasympathetic activation.", props: "FeetUp or Bolster" },
        ]
      },
      {
        title: "Primary Series Adaptation \u2014 Seated",
        time: "12 min",
        poses: [
          { name: "Dandasana", sanskrit: "Staff Pose", hold: "5 breaths", breath: "Ujjayi", notes: "Active legs (right), left leg passive-extended. Sit bones grounded, spine tall.", props: "" },
          { name: "Paschimattanasana A, B, C", sanskrit: "Seated Forward Fold", hold: "5 breaths each grip", breath: "Inhale extend, exhale fold", notes: "A: toes, B: soles, C: wrist-wrap. Classic primary series. Go deep.", props: "Strap", safety: "Deep hip flexion zone \u2014 listen to the hips." },
          { name: "Purvottanasana", sanskrit: "Reverse Plank", hold: "5 breaths", breath: "Lift on inhale", notes: "Counter-pose. Right foot pressing, left leg extended. Full anterior chain opening. No hip flexor.", props: "" },
          { name: "Janu Sirsasana A, B, C", sanskrit: "", hold: "5 breaths each / side", breath: "Linked", notes: "A: heel to inner thigh. B: sit on heel. C: ball of foot on inner thigh. Position left leg passively by hand for each variation.", props: "Strap" },
          { name: "Marichyasana A & C", sanskrit: "", hold: "5 breaths / side", breath: "Inhale lengthen, exhale bind/twist", notes: "A: forward fold with bind. C: twist with bind. Full binds if accessible. Position left leg passively.", props: "" },
          { name: "Modified Navasana \u2014 Press Hold", sanskrit: "", hold: "3 \u00d7 15s", breath: "Steady", notes: "Standard navasana requires bilateral hip flexor \u2014 SKIP. This replacement: parallette press hold with hips lifted, legs resting on bolster in front. Arms do the work. Core fires to stabilize the lift. Same abdominal fire, zero hip flexor loading.", props: "Parallettes, Bolster", safety: "Standard navasana is contraindicated (bilateral hip flexor). This replacement is arm/core only.", animations: ["navasana_mod"] },
          { name: "Baddha Konasana", sanskrit: "Bound Angle", hold: "5 breaths upright + 5 forward", breath: "Linked", notes: "Soles together. Forward fold on exhales.", props: "" },
          { name: "Upavista Konasana A & B", sanskrit: "Wide-Angle Fold", hold: "5 breaths each", breath: "Linked", notes: "A: fold forward. B: balance on sit bones, legs lifted (right active, left strap-assisted or passive). B is the hip flexor concern \u2014 go right-side dominant.", props: "Strap", safety: "Upavista B involves hip flexion to lift legs. Use right leg actively, strap for left \u2014 or skip B entirely." },
          { name: "Supta Padangusthasana", sanskrit: "Supine Hand-to-Toe", hold: "5 breaths / position / side", breath: "Linked", notes: "RIGHT leg: strap around foot, actively extend via hip flexor to A (up), B (side), C (across). LEFT leg: strap-ASSISTED only. Use hands to pull the leg into position \u2014 no active left hip flexor lifting.", props: "Strap", safety: "RIGHT side is a full active series. LEFT side is passive/strap-positioned only." },
        ]
      },
      {
        title: "Deep Stretch & Cool-Down",
        time: "8 min",
        poses: [
          { name: "Supta Figure-4 Stretch", sanskrit: "", hold: "1 min / side", breath: "Natural", notes: "Supine, ankle on opposite knee. Pull passively with hands. Deep external rotation without deep hip flexion \u2014 labrum-friendlier than pigeon.", props: "" },
          { name: "Supta Virasana", sanskrit: "Reclined Hero", hold: "1 min", breath: "Natural", notes: "On bolster if knees allow. Massive quad/hip flexor opening. Left side benefits particularly \u2014 stretching the very muscles we've been protecting.", props: "Bolster" },
          { name: "Supported Matsyasana", sanskrit: "Fish Pose", hold: "1 min", breath: "Expansive", notes: "Bolster under thoracic spine. Arms wide or overhead. Counter to all the forward work.", props: "Bolster" },
          { name: "Supta Parivrtta", sanskrit: "Supine Twist", hold: "1 min / side", breath: "Natural", notes: "Knees stacked, arms wide. Gentle spinal decompression.", props: "" },
          { name: "Viparita Karani", sanskrit: "Legs Up Wall", hold: "2 min", breath: "Natural", notes: "Bolster under sacrum, legs up the wall. Passive hip flexion \u2014 gravity does the work, not hip flexors. Full parasympathetic shift.", props: "Bolster, Wall" },
        ]
      },
      {
        title: "Savasana & Closing",
        time: "5 min",
        poses: [
          { name: "Savasana", sanskrit: "", hold: "4 min", breath: "Release all technique", notes: "Bolster under knees. Second bolster under arms if desired. Full integration of a substantial practice.", props: "Bolster(s)" },
          { name: "Closing Mantra", sanskrit: "Svasthi prajabhyah", hold: "1 min", breath: "\u2014", notes: "Full ashtanga closing. Or three Om. Seal the practice.", props: "" },
        ]
      }
    ]
  }
];
