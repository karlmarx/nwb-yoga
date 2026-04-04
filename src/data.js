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
          { name: "Sukhasana / Virasana on bolster", sanskrit: "", hold: "1 min", breath: "Slow inhale 4 counts, exhale 6 counts", notes: "Sit tall on the bolster — feel both sit bones grounding evenly. Lengthen from tailbone through the crown of the head. For virasana, slide the bolster under the hips only if the knees rest comfortably. Left leg is completely passive — arrange it gently by hand.", props: "Bolster" },
          { name: "Opening Mantra", sanskrit: "Vande Gurunam", hold: "1 min", breath: "—", notes: "Full ashtanga opening if desired. Let the vibration settle into the chest before moving on.", props: "" },
          { name: "Set Intention", sanskrit: "", hold: "1 min", breath: "Ujjayi — soft oceanic whisper at the back of the throat", notes: "Close the eyes. Bring awareness to the practice constraints — left leg remains completely passive and unweighted throughout. No active left hip flexor engagement at any point. Feel the breath anchoring you to this moment.", props: "" },
        ]
      },
      {
        title: "Pranayama",
        time: "8 min",
        poses: [
          { name: "Kapalabhati", sanskrit: "Skull-Shining Breath", hold: "3 rounds × 30", breath: "Sharp exhale through the nose, passive inhale", notes: "Drive every exhale from the diaphragm — feel the lower belly snap inward with each pulse. Keep the chest still and the shoulders relaxed. No hip flexor involvement. Rest 30 seconds between rounds, breathing softly. Build internal heat without external movement.", props: "" },
          { name: "Nadi Shodhana", sanskrit: "Alternate Nostril", hold: "5 min", breath: "Inhale 4 counts, retain 16, exhale 8 — progress ratio as comfortable", notes: "Vishnu mudra on the right hand. Close the right nostril, inhale left. Retain. Close the left, exhale right. Inhale right. Retain. Close right, exhale left. Feel the temperature difference between each nostril. This is your nervous system reset — let the retention be soft, never forced.", props: "" },
          { name: "Ujjayi Establishment", sanskrit: "", hold: "1 min", breath: "Ujjayi — inhale 4 counts, exhale 6 counts", notes: "Gently constrict the back of the throat to create a soft oceanic sound. Feel the breath as a wave: rising on the inhale, receding on the exhale. Carry this breath through the entire remainder of the practice.", props: "" },
        ]
      },
      {
        title: "Gentle Mobility",
        time: "7 min",
        poses: [
          { name: "Seated Cat-Cow", sanskrit: "", hold: "8 rounds", breath: "Inhale arch the spine, exhale round and tuck the chin", notes: "Hands rest on the knees. Inhale — roll the chest forward, draw the shoulder blades together, feel the front body open. Exhale — round deeply, press the hands into the knees, feel the stretch spread across the upper back. Move fluidly, letting each vertebra articulate one at a time.", props: "" },
          { name: "Seated Side Bends", sanskrit: "Parsva Sukhasana", hold: "5 breaths / side", breath: "Inhale to lengthen the spine, exhale to deepen the side bend", notes: "Right hand lowers to the floor or a block. Left arm reaches overhead, creating a long arc from hip to fingertips. Feel the stretch bloom along the entire left side body — from the outer hip through the intercostals to the fingertips. Keep both sit bones grounded. Repeat on the other side.", props: "Block" },
          { name: "Gomukhasana Arms", sanskrit: "Cow Face Arms", hold: "5 breaths / side", breath: "Inhale lift the chest, exhale soften the shoulders down", notes: "Reach the right arm overhead, bend the elbow, and drop the hand between the shoulder blades. Left arm reaches behind the back, hand climbing up. Clasp fingers if accessible — otherwise loop a strap between the hands. Focus on feeling the thoracic spine opening and the chest broadening with each inhale.", props: "Strap" },
          { name: "Garudasana Arms", sanskrit: "Eagle Arms", hold: "5 breaths / side", breath: "Inhale lift the elbows, exhale draw them slightly forward", notes: "Cross the right arm under the left at the elbows. Wrap the forearms and press the palms together if accessible. Keep the elbows at shoulder height. On each inhale, lift the elbows one inch higher — feel the stretch deepen across the upper back and between the shoulder blades.", props: "" },
          { name: "Baddha Konasana", sanskrit: "Bound Angle", hold: "1 min", breath: "Inhale lengthen the spine, exhale release the knees toward the floor", notes: "Soles of the feet together, knees falling open. Place bolsters under both knees for full support. Let gravity do the work — no pressing or forcing. Feel a gentle opening across the inner thighs and groin. Keep the left leg completely passive; use hands to position the left foot if needed.", props: "2× Bolster", safety: "Keep hip flexion well under 90°. Bolsters under knees ensure the hips stay in a safe, shallow range." },
          { name: "Supta Baddha Konasana", sanskrit: "Reclined Bound Angle", hold: "2 min", breath: "Inhale expand the belly, exhale let the whole body soften into the supports", notes: "Recline onto a bolster placed lengthwise under the spine. Blocks or bolsters under both knees. Arms rest open at the sides, palms facing up. Feel the chest opening and the breath filling the front body. Surrender all muscular effort — the props hold you completely. This is full restorative release.", props: "Bolster, Blocks", safety: "Left leg is fully supported and passive. Do not let the knees drop unsupported — bolsters prevent excessive hip flexion." },
        ]
      },
      {
        title: "Supported Inversions — FeetUp Trainer",
        time: "5 min",
        poses: [
          {
            name: "Supported Sirsasana", sanskrit: "Headstand", hold: "3–5 min", breath: "Slow, steady ujjayi — inhale 4 counts, exhale 6 counts",
            notes: "Entry: (1) Grip handles firmly, tuck the RIGHT knee to the chest, press up with the right leg. (2) Extend the right leg to the ceiling using the right hip flexor. (3) Reach down with ONE HAND and physically lift/guide the left leg into position — no momentum, no swinging. (4) Re-grip handles once both legs are vertical. Once inverted, both legs are gravity-held — zero hip flexor demand. Explore: straddle (30s) — feel the inner thighs lengthen; diamond/baddha konasana legs (30s) — feel the hips open gently; straight hold (remainder) — feel the entire spine decompress.",
            props: "FeetUp Trainer", safety: "Entry uses HAND to guide the left leg — never kick or swing. Momentum risks an involuntary hip flexor burst. Keep the left foot completely unweighted at all times.",
            animations: ["headstand"]
          },
        ]
      },
      {
        title: "Closing",
        time: "2 min",
        poses: [
          { name: "Savasana", sanskrit: "Corpse Pose", hold: "2 min", breath: "Release all technique — breathe softly through the nose, letting each exhale grow longer than the last", notes: "Place a bolster under the right knee. Extend the left leg onto a separate bolster for comfort and support. Arms rest at the sides, palms up. Close the eyes. Feel the weight of the body sinking into the mat with each exhale. Release the jaw, the tongue, the space behind the eyes. Full surrender.", props: "Bolster", safety: "Left leg remains fully supported on the bolster — zero weight bearing." },
          { name: "Closing Mantra", sanskrit: "", hold: "—", breath: "—", notes: "Svasthi prajabhyah... or simply three Om. Let the vibration linger before opening the eyes.", props: "" },
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
          { name: "Opening Mantra + Intention", sanskrit: "", hold: "1 min", breath: "Slow ujjayi — inhale 4, exhale 6", notes: "Chant the opening mantra if desired. Set intention: the left leg remains passive throughout the entire practice. Zero left hip flexor activation. Feel the ujjayi breath establishing a rhythm that will carry you through the work ahead.", props: "" },
          { name: "Kapalabhati", sanskrit: "", hold: "3 rounds × 50", breath: "Sharp exhale through the nose, passive inhale", notes: "Hands on knees, spine tall. Drive each exhale from the lower belly — feel the navel snap toward the spine. Keep the chest and shoulders completely still. All abdominal, no hip flexor involvement. Rest 20 seconds between rounds with soft natural breathing.", props: "" },
          { name: "Nadi Shodhana", sanskrit: "", hold: "4 min", breath: "Inhale 4 counts, retain 16, exhale 8 — extend as comfortable", notes: "Vishnu mudra. Close the right nostril, inhale left. Retain with both nostrils closed — feel the stillness at the top. Exhale right. Inhale right. Retain. Exhale left. The retention should feel spacious, never strained. This is your nervous system reset before strength work.", props: "" },
          { name: "Bhastrika", sanskrit: "Bellows Breath", hold: "2 rounds × 20", breath: "Forceful inhale and exhale — equal power both directions", notes: "Pump the arms overhead on each inhale, pull them down on each exhale. Feel the energy rising through the torso with each round. Rest 15 seconds between rounds. This is the energizer — feel the tingling in the hands and face after each round.", props: "" },
        ]
      },
      {
        title: "Warm-Up & Wrist Prep",
        time: "5 min",
        poses: [
          { name: "Seated Cat-Cow", sanskrit: "", hold: "8 rounds", breath: "Inhale arch the spine, exhale round deeply", notes: "Hands on knees. Inhale — roll the chest forward, draw the shoulder blades together, feel the front body expand. Exhale — round the spine, press the hands into the knees, feel the stretch across the entire upper back. Move fluidly — let each vertebra articulate one at a time, waking the spine for the work ahead.", props: "" },
          { name: "Seated Twists", sanskrit: "", hold: "5 breaths / side", breath: "Inhale lengthen the spine tall, exhale deepen the rotation", notes: "Place the right hand on the left knee, left hand behind. Inhale — grow taller through the crown. Exhale — rotate from the mid-back, not the lower back. Feel the twist wringing through the thoracic spine. Keep both sit bones grounded. Repeat on the other side.", props: "", safety: "Rotate from the thoracic spine only — no spinal rotation under load. This is gentle, seated, and unloaded." },
          { name: "Shoulder CARs", sanskrit: "", hold: "5 / direction / arm", breath: "Inhale through the first half of the circle, exhale through the second", notes: "Controlled Articular Rotations: slowly trace the largest possible circle with the arm through its full range of motion. Generate maximal tension throughout — imagine pushing the walls of a tube outward while the arm traces the circle. Feel every sticky spot and work through it. Essential for shoulder joint health and mobility mapping before pressing work.", props: "", animations: ["cars"] },
          { name: "Wrist Warm-Up Sequence", sanskrit: "", hold: "2 min", breath: "Steady ujjayi throughout", notes: "Fingers-forward press (30s) — feel the stretch along the forearm flexors. Fingers-back press (30s) — feel the extensors engage. Prayer stretches (30s) — press palms together, lower the hands while keeping the heels of the palms connected. Fist rotations (30s) — slow circles in both directions. ESSENTIAL prep for parallette work. Do not skip this.", props: "" },
        ]
      },
      {
        title: "Modified Floor Vinyasa",
        time: "8 min",
        poses: [
          {
            name: "Modified Surya Namaskara", sanskrit: "Sun Salutation", hold: "5 rounds", breath: "One breath per movement — inhale to extend, exhale to fold or lower",
            notes: "Flow: Seated arms up (inhale) → hands to blocks (exhale) → tabletop with RIGHT knee down, left leg extended back passively (inhale) → plank with left leg resting on mat (exhale, hold) → Chaturanga (exhale, lower with control) → NWB Up-Dog: left thigh/shin/foot ALL stay on mat — right side performs up-dog, left side does lazy cobra; backbend comes from arms + thoracic extension only (inhale) → one-legged Down-Dog: right foot only, left leg extended behind via glute engagement (exhale) → tabletop (inhale) → seated (exhale). Build heat with ujjayi. Wear pants/leggings that slide easily on the mat — if the left leg catches on a sticky surface, there's a reflexive tendency to give it a hip flexor tug.",
            props: "Blocks", safety: "Left leg stays completely passive throughout — no active left hip flexor at any point. Let the left leg drag/rest on the mat. Smooth-fabric leg covering recommended to prevent catching.",
            animations: ["tabletop", "transition", "plank", "chaturanga", "updog", "downdog"]
          },
          { name: "Dolphin Pose Holds", sanskrit: "", hold: "5 breaths × 3", breath: "Ujjayi — inhale press the forearms down, exhale lift the hips higher", notes: "Forearms flat on the mat, hips pressing high toward the ceiling. Right foot pressing firmly, left leg extended behind in hip extension — the glute holds it, not the hip flexor. Feel the shoulders opening and the upper back strengthening. Rest 15 seconds between rounds. This is massive shoulder and core work.", props: "", animations: ["dolphin"] },
          { name: "Thread the Needle", sanskrit: "", hold: "5 breaths / side", breath: "Exhale to thread the arm under, inhale to open", notes: "From tabletop on the right knee, left leg extended behind. Thread the right arm under the left, lowering the right shoulder and temple to the mat. Feel the twist unwinding the thoracic spine — a deep release between the shoulder blades. Zero hip flexor involvement. Repeat on the other side.", props: "", animations: ["threadneedle"] },
        ]
      },
      {
        title: "Parallette Strength Series",
        time: "10 min",
        poses: [
          { name: "Parallette Push-Ups", sanskrit: "", hold: "3 × 10", breath: "Inhale lower with control, exhale press up powerfully", notes: "Grip the parallettes firmly. Lower until the chest passes below the handles — enjoy the extra depth parallettes give you. Left leg rests passively on the mat. Feel the pecs and triceps engage through the full range. Rest 30 seconds between sets.", props: "Parallettes" },
          { name: "Archer Push-Ups", sanskrit: "", hold: "3 × 5 / side", breath: "Inhale lower toward the bent arm, exhale press back to center", notes: "One hand grips the parallette, the other extends wide. Lower toward the bent arm while the straight arm slides out. Feel the unilateral load concentrating in one pec and tricep. This builds serious pressing power. Rest 30 seconds between sets.", props: "Parallettes" },
          { name: "Parallette Plank Hold", sanskrit: "", hold: "60s", breath: "Steady ujjayi — inhale 3, exhale 4", notes: "Hollow body position: grip the parallettes, tuck the tailbone, draw the ribs toward the hips. Right foot actively pressing, left leg resting passively on the mat. Feel the core bracing as a single unit from shoulders to hips. If 60 seconds feels easy, add shoulder taps.", props: "Parallettes" },
          { name: "Shoulder Taps", sanskrit: "", hold: "3 × 10", breath: "Exhale as you tap, inhale to return", notes: "From plank on parallettes. Lift one hand to tap the opposite shoulder, then return. Minimize hip rocking — feel the obliques and deep core fighting to prevent rotation. This is anti-rotation work at its finest. Rest 20 seconds between sets.", props: "Parallettes" },
          {
            name: "Right-Leg L-Sit", sanskrit: "", hold: "3 × 15–20s", breath: "Steady ujjayi — keep the breath flowing even when the muscles shake",
            notes: "Press down through the parallettes, lift the hips off the floor. RIGHT leg extends actively forward via the right hip flexor — feel it working hard. Left leg hangs passively below or rests on a block. Lats, triceps, and the entire right side are on fire. Rest 30 seconds between holds.",
            props: "Parallettes", safety: "Left leg HANGS completely passive. Zero left hip flexor activation — the left leg is dead weight.",
            animations: ["lsit"]
          },
          {
            name: "Pseudo-Planche Push-Ups", sanskrit: "", hold: "3 × 8", breath: "Inhale lower slowly, exhale press up with control",
            notes: "Hands on parallettes, lean the shoulders forward past the wrists until the feet feel light. Push up from this forward-shifted position. Feel the intense load on the anterior delts and upper chest — the same pressing chain as crow without any hip flexor demand. Rest 30 seconds between sets.",
            props: "Parallettes", safety: "Zero hip flexor involvement. Both feet and the left leg stay on the mat throughout.",
            animations: ["pseudoplanche"]
          },
        ]
      },
      {
        title: "FeetUp Inversion Series",
        time: "8 min",
        poses: [
          {
            name: "Supported Sirsasana", sanskrit: "Headstand", hold: "3 min", breath: "Slow ujjayi — inhale 4, exhale 6",
            notes: "Entry: (1) Grip handles firmly, tuck the RIGHT knee to the chest, press up with the right leg. (2) Extend the right leg to the ceiling. (3) Reach down with ONE HAND and physically lift/guide the left leg — no momentum, no swinging. (4) Re-grip handles. Once up: straight hold (1 min) — feel the spine lengthening; straddle (30s) — feel the inner thighs opening; eagle legs (30s) — feel the outer hips engaging; diamond (30s) — feel the hips releasing.",
            props: "FeetUp Trainer", safety: "Entry uses HAND to guide the left leg — never kick or swing. Left foot remains completely unweighted.",
            animations: ["headstand"]
          },
          {
            name: "Inverted Leg Lowers", sanskrit: "", hold: "5 / leg, slow", breath: "Exhale slowly as you lower the leg, inhale to return it vertical",
            notes: "From headstand, lower ONE leg toward the floor (front of the body), then raise it back. This is HIP EXTENSOR work — the glutes and hamstrings control the descent against gravity. Feel the glute engage to decelerate the lowering leg and the deep core firing to maintain balance. Hip flexors are completely passive throughout. Incredible core + posterior chain training.",
            props: "FeetUp Trainer", safety: "Despite lowering the leg, hip FLEXORS are not the prime movers in inversion. Glutes and hamstrings eccentrically control the movement. Safe for the stress fracture constraint — zero left hip flexor loading.",
            animations: ["inversion"]
          },
          { name: "Supported Sarvangasana", sanskrit: "Shoulderstand", hold: "2 min", breath: "Soft ujjayi — inhale 3, exhale 5. Let the breath slow naturally as the nervous system quiets", notes: "On bolster or using FeetUp. Let the legs rest vertically. Feel the blood returning from the legs, the heart rate slowing, the nervous system shifting into parasympathetic mode. Close the eyes.", props: "FeetUp Trainer or Bolster" },
        ]
      },
      {
        title: "Seated Flexibility",
        time: "6 min",
        poses: [
          { name: "Janu Sirsasana A", sanskrit: "Head-to-Knee", hold: "5 breaths / side", breath: "Inhale lengthen the spine forward, exhale fold deeper over the extended leg", notes: "One leg extends forward, the other folds with the sole against the inner thigh. Reach for the foot or loop a strap around it. Feel the hamstring of the extended leg lengthening on each exhale. When the left leg is folded, position it passively by hand — no active left hip flexor pulling.", props: "Strap", safety: "Hip flexion approaches 90°+ in the forward fold. Proceed mindfully — the anterosuperior labral tears are loaded in this range. Use the strap to control depth. Back off if you feel any pinching in the front of the hip." },
          { name: "Paschimattanasana", sanskrit: "Seated Forward Fold", hold: "8 breaths", breath: "Inhale extend the spine long, exhale fold from the hips — not the lower back", notes: "Both legs extend forward. Loop a strap around the feet if the hands don't reach. On each inhale, lengthen the front body. On each exhale, hinge forward from the hip creases — feel the hamstrings and the entire posterior chain releasing. Keep the spine long rather than rounding to reach the toes.", props: "Strap", safety: "Deep hip flexion zone. Do not flex the hips past 90° — use the strap to control depth. Prioritize a long spine over depth of fold." },
          { name: "Ardha Matsyendrasana", sanskrit: "Half Lord of the Fishes", hold: "5 breaths / side", breath: "Inhale grow tall through the crown, exhale deepen the twist from the mid-back", notes: "Seated twist — place the right foot outside the left thigh (or keep it grounded if that's too deep). Left leg extends forward or folds, positioned passively by hand. Feel the twist wringing through the thoracic spine, not the lumbar. Each inhale creates space; each exhale deepens the rotation.", props: "", safety: "Rotate from the thoracic spine only. No spinal rotation under load — this is a gentle, unloaded seated twist. Keep the left leg passive." },
          { name: "Gomukhasana", sanskrit: "Cow Face — Full", hold: "5 breaths / side", breath: "Inhale lift the chest, exhale soften deeper into the hip opening", notes: "Stack the knees — position the left leg passively by hand, never using the left hip flexor to pull it into place. Full arm bind with strap if fingers don't clasp. Feel the deep external rotation in both hips and the thoracic opening through the arm bind.", props: "Strap", safety: "Position the left leg entirely by hand. Do not flex the left hip actively. If knee stacking causes any pinching in the front of the hip, place a block between the knees instead." },
        ]
      },
      {
        title: "Closing",
        time: "5 min",
        poses: [
          { name: "Supported Matsyasana", sanskrit: "Fish Pose", hold: "1 min", breath: "Inhale expand the chest wide, exhale soften the shoulders toward the floor", notes: "Place a bolster lengthwise under the thoracic spine. Arms open wide, palms facing up. Feel the entire front body opening — the chest, the fronts of the shoulders, the throat. This is the counter-pose to all the forward work. Let gravity do the opening.", props: "Bolster" },
          { name: "Supta Parivrtta", sanskrit: "Supine Twist", hold: "5 breaths / side", breath: "Exhale to deepen the twist, inhale to create space", notes: "Lie on the back, draw the knees toward the chest (use hands to guide the left knee — no active left hip flexor). Drop both knees to one side, arms wide. Feel the twist traveling through the entire spine — a gentle wringing from sacrum to mid-back. Keep both shoulders grounded.", props: "", safety: "This is passive, unloaded spinal rotation — safe for L4-L5 DDD. Guide the left knee with hands only." },
          { name: "Savasana", sanskrit: "", hold: "3 min", breath: "Release all technique — let the breath become effortless and quiet", notes: "Place a bolster under the knees to release the lower back. Arms at the sides, palms up. Close the eyes. Feel the weight of the entire body sinking into the mat. Release the jaw, the tongue, the space behind the eyes, the muscles of the face. Full integration of the practice.", props: "Bolster", safety: "Left leg supported on the bolster — zero weight bearing." },
          { name: "Closing Mantra", sanskrit: "", hold: "—", breath: "—", notes: "Three Om or the full ashtanga closing. Let the vibration settle into the chest. Seal the practice with presence.", props: "" },
        ]
      }
    ]
  },
  {
    id: "agni",
    name: "Agni",
    duration: "70 min",
    subtitle: "Full Practice — Push the Edge",
    color: "#8B2500",
    description: "Ashtanga-inspired full session. Comprehensive pranayama, aggressive parallette series, deep inversion work, primary series adaptations. This is where you live.",
    sections: [
      {
        title: "Opening & Pranayama",
        time: "10 min",
        poses: [
          { name: "Full Opening Mantra", sanskrit: "Vande Gurunam", hold: "2 min", breath: "—", notes: "Complete. Set the container. Let the chant reverberate through the chest and establish the gravity of the practice ahead.", props: "" },
          { name: "Kapalabhati", sanskrit: "", hold: "3 rounds × 80–100", breath: "Aggressive exhale — the inhale is purely passive recoil", notes: "This is your fire-starter. Full abdominal engagement — feel the lower belly snapping inward like a piston with each exhale. Keep the chest lifted and completely still. The face stays soft even as the belly works hard. Rest 20 seconds between rounds. Build the internal fire that will fuel 70 minutes of work.", props: "" },
          { name: "Bhastrika", sanskrit: "", hold: "3 rounds × 20", breath: "Forceful inhale AND exhale — equal power both directions", notes: "Pump the arms overhead on each inhale, pull them down forcefully on each exhale. Feel the energy igniting from the belly up through the crown. Rest 15 seconds between rounds. Tingling in the hands and face is normal — that's prana moving.", props: "" },
          { name: "Nadi Shodhana", sanskrit: "", hold: "5 min", breath: "Inhale 5 counts, retain 20, exhale 10 — advanced ratio, back off if strained", notes: "Vishnu mudra. This is pure concentration — each cycle demands your full attention. The retention should feel like a still lake, not a held breath. Feel the balance between the left and right channels equalizing. If 5:20:10 isn't accessible today, return to 4:16:8 without judgment.", props: "" },
        ]
      },
      {
        title: "Warm-Up",
        time: "5 min",
        poses: [
          { name: "Seated Cat-Cow → Side Bends → Twists", sanskrit: "", hold: "5 each", breath: "Inhale to extend/open, exhale to round/deepen", notes: "Flowing sequence — one movement per breath. Cat-Cow: feel each vertebra articulating. Side Bends: feel the intercostals stretching from hip to armpit. Twists: feel the thoracic spine wringing out tension. Wake the entire spine systematically.", props: "", safety: "Twists are gentle and unloaded — safe for L4-L5 DDD. Rotate from the mid-back, not the lumbar spine." },
          { name: "Shoulder CARs + Scapular Push-Ups", sanskrit: "", hold: "5 each", breath: "Inhale through the first half of each movement, exhale through the second", notes: "CARs: slowly trace the largest circle with each arm — generate maximal tension throughout, like pushing the walls of a tube. Feel every sticky spot and own it. Then scapular push-ups in plank: protract the shoulder blades apart (feel the upper back widen), retract them together (feel the chest open). Full shoulder prep for the heavy pressing ahead.", props: "", animations: ["cars"] },
          { name: "Extensive Wrist Warm-Up", sanskrit: "", hold: "3 min", breath: "Steady ujjayi throughout", notes: "You're about to load the wrists hard. Fingers forward on the floor, lean in (45s) — feel the forearm flexors stretching. Fingers back, lean gently (45s) — feel the extensors. Prayer press: palms together, lower the hands while keeping heels connected (45s). Fist rotations both directions (45s). Do not skip this — your wrists are about to earn their keep.", props: "" },
        ]
      },
      {
        title: "Modified Surya Namaskara — Power Rounds",
        time: "10 min",
        poses: [
          {
            name: "Modified Surya A", sanskrit: "", hold: "5 rounds", breath: "One breath per movement — inhale to extend/rise, exhale to fold/lower",
            notes: "NWB flow at PACE. Seated arms up (inhale) → hands to blocks (exhale) → tabletop with RIGHT knee down, left leg extended back passively (inhale) → plank with left leg resting on mat (exhale, hold) → Chaturanga — lower with control, elbows tracking back (exhale) → NWB Up-Dog: left thigh/shin stay on mat, backbend from arms + thoracic extension, feel the chest cracking open (inhale) → one-leg Down-Dog: right foot only, left leg extended behind via glute engagement (exhale) → tabletop (inhale) → seated (exhale). Build ujjayi heat — by round 3, the breath should be audible. Wear sliding-fabric pants to prevent the left leg catching on a sticky mat.",
            props: "Blocks", safety: "Left leg always passive/trailing — zero active left hip flexor at any point. Smooth-fabric leg covering recommended to prevent reflexive hip flexor engagement if the leg catches.",
            animations: ["tabletop", "transition", "plank", "chaturanga", "updog", "downdog"]
          },
          { name: "Modified Surya B Addition", sanskrit: "", hold: "3 rounds", breath: "One breath per movement — inhale to rise, exhale to vinyasa", notes: "Add: right-knee Virabhadrasana I arms — a kneeling high lunge on the right knee, left leg extended back passively. Reach the arms overhead on inhale, feel the right quad and hip flexor firing. Exhale → vinyasa → repeat. It's not standing warrior — but it builds serious heat when linked at pace. Feel the sweat starting.", props: "Blocks", safety: "Left leg trails passively. All lunge work is on the right leg only." },
          { name: "Dolphin Push-Ups", sanskrit: "", hold: "3 × 8", breath: "Exhale to press back to dolphin, inhale to shift forward to forearm plank", notes: "Forearm plank → dolphin → forearm plank. Right foot pressing hard, left leg extended behind via glute. Feel the shoulders taking massive load on each transition. The delts and serratus should be burning by set 2. Rest 20 seconds between sets.", props: "", animations: ["dolphin"] },
        ]
      },
      {
        title: "Parallette Power Series — Advanced",
        time: "15 min",
        poses: [
          { name: "Push-Up Complex", sanskrit: "", hold: "3 rounds", breath: "Exhale to press, inhale to lower — maintain ujjayi throughout", notes: "5 standard + 5 wide + 5 diamond + 5 pike = 1 round. No rest between grips — feel the fatigue shifting across different muscle groups as the hand position changes. 30 seconds between rounds. Left leg rests on the mat throughout. By round 3, the arms should be talking to you.", props: "Parallettes" },
          { name: "Archer Push-Ups", sanskrit: "", hold: "3 × 5 / side", breath: "Inhale lower toward the bent arm, exhale press explosively back to center", notes: "Full lateral extension on the straight arm. Feel the entire load concentrating in one pec, one tricep, one shoulder. This builds unilateral pressing power that transfers directly to handstand and planche work. Rest 30 seconds between sets.", props: "Parallettes" },
          {
            name: "Right-Leg L-Sit — Max Holds", sanskrit: "", hold: "3 × max", breath: "Steady ujjayi — the breath is the only thing keeping the hold alive",
            notes: "Press down through the parallettes, lift the hips. Right leg extends actively — feel the right hip flexor, the right quad, the lats, and the triceps all firing simultaneously. Left leg hangs as dead weight. Try to beat your time each set. These build absurd lat and tricep endurance. Rest 45 seconds between holds.",
            props: "Parallettes", safety: "Left leg hangs completely passive — zero left hip flexor activation. The left leg is dead weight throughout.",
            animations: ["lsit"]
          },
          {
            name: "Pseudo-Planche Push-Ups — Advanced", sanskrit: "", hold: "3 × 10", breath: "Inhale lower with a 3-count, exhale press up with power",
            notes: "Deeper lean than Tapas tier. Hands on parallettes, lean the shoulders forward until they're well past the wrists — feel the feet becoming light. Push up from this extreme forward position. Feel the anterior delts and upper chest taking enormous load. This is building toward planche. Rest 30 seconds between sets.",
            props: "Parallettes", safety: "Zero hip flexor involvement. Both feet and the left leg rest on the mat throughout.",
            animations: ["pseudoplanche"]
          },
          {
            name: "Side Plank Variations", sanskrit: "", hold: "3 × 20s / side", breath: "Steady ujjayi — inhale 3, exhale 4",
            notes: "Right foot on the ground, left leg resting on top of right or on the mat. Grip the parallette for wrist relief. Explore: top arm reaches to ceiling — feel the obliques fire; thread-through — feel the rotation through the thoracic spine; hip dips — feel the lateral core engaging. Oblique and shoulder stabilizer work.",
            props: "Parallettes", safety: "Zero hip flexor demand. Left leg is completely passive throughout — resting on the right leg or the mat."
          },
          {
            name: "Planche Leans → Straddle Planche", sanskrit: "", hold: "5 × 10s lean, then explore", breath: "Steady ujjayi — do not hold the breath even when the intensity peaks",
            notes: "Lean the shoulders forward past the wrists until the feet feel light. Hold. Straddle planche: legs wide — the straddle position uses gravity + adductors, not hip flexors. Feel the shoulders, chest, and core bearing the full load. This is the frontier — explore it with respect.",
            props: "Parallettes", safety: "CONTRAINDICATED: tuck planche requires bilateral hip flexor isometric hold (same mechanism as crow). Straddle ONLY — hip flexors have no role in the straddle position."
          },
          { name: "Purvottanasana on Parallettes", sanskrit: "Reverse Plank", hold: "3 × 15s", breath: "Inhale lift the chest to the ceiling, exhale maintain the hold", notes: "Hands on parallettes behind you, right foot pressing, left leg extended and resting on the mat. Press the hips high — feel the entire front body opening: chest, shoulders, hip flexors. The posterior chain — glutes, hamstrings, upper back — does all the work. This is the antidote to forward-flexion dominance.", props: "Parallettes", safety: "Zero hip flexor activation. Left leg rests passively on the mat. The hip flexors are being stretched, not loaded." },
        ]
      },
      {
        title: "FeetUp Inversion Series — Extended",
        time: "12 min",
        poses: [
          {
            name: "Supported Sirsasana — 5-Minute Hold", sanskrit: "Headstand", hold: "5 min", breath: "Slow, meditative ujjayi — inhale 5, exhale 7. Let the breath deepen as the body settles",
            notes: "Hand-guided entry (no momentum). This is your inversion palace. Minute 1: straight hold — feel the spine decompress, the shoulders stabilize. Minute 2: straddle + diamond — feel the hips opening in zero gravity. Minute 3: eagle legs + figure-4 — feel the external rotators releasing. Minute 4: slow single-leg lowers (5/leg) — feel the GLUTES and hamstrings controlling the descent (this is hip EXTENSOR work, not flexor). Minute 5: return to stillness — feel the meditative quality of the inversion.",
            props: "FeetUp Trainer", safety: "Entry uses HAND to guide the left leg — never kick or swing. Left foot remains completely unweighted. Leg lowers use hip extensors (glutes/hamstrings), not flexors.",
            animations: ["headstand", "inversion"]
          },
          { name: "Pincha Mayurasana", sanskrit: "Forearm Stand", hold: "2 min total", breath: "Steady ujjayi — keep the breath flowing even in moments of free balance", notes: "Forearms on the FeetUp seat, shoulder-width apart. Walk the feet in, then lift. Feel the shoulders stacking over the elbows, the core bracing to maintain the line. If free balance comes for a moment, ride it — feel the micro-adjustments in the forearms and core. The trainer catches you when balance goes.", props: "FeetUp Trainer", safety: "Left leg guided into position by hand. Zero left hip flexor activation during entry." },
          { name: "Inversion → Transition → Rest", sanskrit: "", hold: "30s rest", breath: "Soft, unstructured breathing — let the body choose its rhythm", notes: "Come down slowly. Rest in supported child's pose — right knee only, left leg extended behind. Feel the blood redistributing. Let the heart rate settle.", props: "", safety: "Left leg extends passively behind — no kneeling on the left side." },
          { name: "Supported Sarvangasana", sanskrit: "Shoulderstand", hold: "3 min", breath: "Soft ujjayi — inhale 3, exhale 6. Let each exhale grow longer", notes: "Bolster under the sacrum for support, or use FeetUp. Legs straight up — feel the blood draining from the legs. Explore straddle, diamond, and single-leg variations. Feel the parasympathetic activation — the heart rate dropping, the nervous system quieting. Close the eyes.", props: "FeetUp or Bolster" },
        ]
      },
      {
        title: "Primary Series Adaptation — Seated",
        time: "12 min",
        poses: [
          { name: "Dandasana", sanskrit: "Staff Pose", hold: "5 breaths", breath: "Ujjayi — inhale lengthen, exhale ground the sit bones", notes: "Right leg actively extends — press through the right heel, engage the right quad. Left leg extends passively — arrange it by hand. Feel both sit bones grounding evenly. Spine tall — imagine a thread pulling the crown toward the ceiling. Hands press into the floor beside the hips.", props: "" },
          { name: "Paschimattanasana A, B, C", sanskrit: "Seated Forward Fold", hold: "5 breaths each grip", breath: "Inhale extend the spine long, exhale fold deeper from the hip creases", notes: "A: grip the toes. B: grip the soles. C: wrap the wrists past the feet. Classic primary series — go deep. Feel the hamstrings releasing incrementally with each exhale. Keep the spine long rather than rounding to reach further.", props: "Strap", safety: "Deep hip flexion zone — the hips approach and may exceed 90°. Listen to the hips carefully. If you feel pinching in the front of either hip, back off and use the strap. The anterosuperior labral tears are loaded here." },
          { name: "Purvottanasana", sanskrit: "Reverse Plank", hold: "5 breaths", breath: "Inhale lift the hips high, exhale maintain the hold", notes: "Counter-pose. Press the hands behind you, right foot drives into the floor, left leg extends passively. Lift the hips and feel the entire front body opening — chest, hip flexors, quads. The glutes and hamstrings fire to maintain the lift. Zero hip flexor demand.", props: "", safety: "Left leg rests passively. Hip flexors are being stretched, not activated." },
          { name: "Janu Sirsasana A, B, C", sanskrit: "", hold: "5 breaths each / side", breath: "Inhale lengthen, exhale fold — one breath, one movement", notes: "A: heel to inner thigh. B: sit on the heel. C: ball of foot against the inner thigh. Position the left leg passively by hand for each variation — never use the left hip flexor to pull it into place. Feel the hamstring of the extended leg releasing with each exhale. Use the strap to control depth.", props: "Strap", safety: "When the left leg is extended, monitor hip flexion depth. When the left leg is folded, position it entirely by hand." },
          { name: "Marichyasana A & C", sanskrit: "", hold: "5 breaths / side", breath: "Inhale lengthen the spine, exhale deepen the bind or twist", notes: "A: forward fold with bind — feel the shoulder opening as the bind deepens. C: twist with bind — feel the thoracic spine rotating. Full binds if accessible. Position the left leg passively by hand for all variations.", props: "", safety: "C involves spinal rotation — keep it unloaded and gentle. Rotate from the thoracic spine, not the lumbar. Position the left leg by hand only." },
          { name: "Modified Navasana — Press Hold", sanskrit: "", hold: "3 × 15s", breath: "Steady ujjayi — do not hold the breath even as the arms shake", notes: "Standard navasana requires bilateral hip flexor engagement — SKIP. This replacement: grip the parallettes, press the body off the floor, legs resting on a bolster in front. Arms do the work. Feel the core firing to stabilize the lift — the same abdominal fire as navasana without any hip flexor loading. Rest 20 seconds between holds.", props: "Parallettes, Bolster", safety: "Standard navasana is CONTRAINDICATED (bilateral hip flexor). This replacement is arm/core only — zero hip flexor demand.", animations: ["navasana_mod"] },
          { name: "Baddha Konasana", sanskrit: "Bound Angle", hold: "5 breaths upright + 5 breaths forward fold", breath: "Inhale lengthen the spine, exhale fold from the hips", notes: "Soles of the feet together, knees falling open. Upright: feel the inner thighs releasing with each exhale. Forward fold: hinge from the hips, leading with the chest. Feel the groin and inner thighs opening progressively.", props: "", safety: "Keep hip flexion moderate in the forward fold. Do not force the knees toward the floor — let gravity work." },
          { name: "Upavista Konasana A & B", sanskrit: "Wide-Angle Fold", hold: "5 breaths each", breath: "Inhale extend the spine, exhale fold or lift", notes: "A: legs wide, fold forward — feel the inner thighs and hamstrings stretching. Lead with the chest, not the head. B: balance on the sit bones, legs lifted — right leg active (feel the right hip flexor working hard), left leg strap-assisted or passive.", props: "Strap", safety: "Upavista B involves hip flexion to lift the legs. Use the right leg actively only. Strap-assist the left leg — or skip B entirely to avoid any left hip flexor engagement." },
          { name: "Supta Padangusthasana", sanskrit: "Supine Hand-to-Toe", hold: "5 breaths / position / side", breath: "Inhale lengthen the leg, exhale deepen the stretch", notes: "RIGHT leg: strap around the foot, actively extend via the hip flexor. A (straight up) — feel the hamstring lengthening. B (out to the side) — feel the inner thigh opening. C (across the body) — feel the IT band and outer hip releasing. LEFT leg: strap-ASSISTED only. Use the hands to pull the leg into each position — the left hip flexor stays completely silent.", props: "Strap", safety: "RIGHT side is a full active series. LEFT side is passive/strap-positioned only — zero active left hip flexor lifting." },
        ]
      },
      {
        title: "Deep Stretch & Cool-Down",
        time: "8 min",
        poses: [
          { name: "Supta Figure-4 Stretch", sanskrit: "", hold: "1 min / side", breath: "Inhale create space, exhale sink deeper into the stretch", notes: "Lie on the back, place the right ankle on the left knee. Pull the left thigh toward the chest with both hands — let the hands do all the pulling, not the hip flexor. Feel the deep external rotation in the right hip — a stretch through the piriformis and deep rotators. This is labrum-friendlier than pigeon because it avoids deep hip flexion.", props: "", safety: "Use hands to pull the left thigh — zero active left hip flexor. The left hip stays well under 90° flexion. If pulling the thigh approaches 90°, place the left foot on the wall instead." },
          { name: "Supta Virasana", sanskrit: "Reclined Hero", hold: "1 min", breath: "Inhale expand the front body, exhale melt deeper into the bolster", notes: "Recline onto a bolster if the knees allow. Feel the massive quad and hip flexor opening — the very muscles we've been protecting on the left side are now getting a gentle, passive stretch. The left side benefits particularly here.", props: "Bolster", safety: "Only if the knees tolerate this position. If there's any knee pain, skip and substitute a supine quad stretch with a strap." },
          { name: "Supported Matsyasana", sanskrit: "Fish Pose", hold: "1 min", breath: "Inhale expand the chest, exhale release the shoulders toward the floor", notes: "Bolster under the thoracic spine. Arms wide or overhead. Feel the entire front body opening — the counter-pose to all the forward folding and pressing work. Let gravity peel the chest open. Close the eyes.", props: "Bolster" },
          { name: "Supta Parivrtta", sanskrit: "Supine Twist", hold: "1 min / side", breath: "Exhale deepen the twist, inhale create space between the vertebrae", notes: "Knees stacked (guide the left knee with hands), arms wide. Feel the twist traveling from the sacrum up through the thoracic spine. Keep both shoulders grounded. Gentle spinal decompression — the L4-L5 area should feel relief here.", props: "", safety: "This is passive, unloaded spinal rotation — safe for L4-L5 DDD. Guide the left knee with hands only — no active left hip flexor." },
          { name: "Viparita Karani", sanskrit: "Legs Up Wall", hold: "2 min", breath: "Release all technique — let the breath become soft and effortless", notes: "Bolster under the sacrum, legs resting up the wall. This is passive hip flexion — gravity holds the legs, not the hip flexors. Feel the blood draining from the legs, the lower back releasing into the bolster, the nervous system shifting fully into parasympathetic mode. Close the eyes. This is your transition from effort to rest.", props: "Bolster, Wall", safety: "Passive hip flexion only — gravity does the work, not the hip flexors. Completely safe for all constraints." },
        ]
      },
      {
        title: "Savasana & Closing",
        time: "5 min",
        poses: [
          { name: "Savasana", sanskrit: "", hold: "4 min", breath: "Release all technique — the breath breathes itself", notes: "Bolster under the knees. Second bolster under the arms if desired. Close the eyes. Feel the weight of the body pressing into the mat — the head, the shoulders, the hips, the heels. Release the jaw. Release the tongue from the roof of the mouth. Release the space behind the eyes. Full integration of a substantial practice. Let the body absorb what it has learned.", props: "Bolster(s)", safety: "Left leg fully supported — zero weight bearing." },
          { name: "Closing Mantra", sanskrit: "Svasthi prajabhyah", hold: "1 min", breath: "—", notes: "Full ashtanga closing. Or three Om. Let each vibration settle before beginning the next. Feel the practice sealed and complete.", props: "" },
        ]
      }
    ]
  }
];
