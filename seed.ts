import { PrismaClient, LevelTier, Role, Language, WiringType } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🚀 Starting database seeding for LOGICORE by HAMEED...");

  // 1. Seed Super Admin User (Eng. Hameed)
  const passwordHash = await bcrypt.hash("HameedAdmin2026!#", 12);
  const admin = await prisma.user.upsert({
    where: { email: "hameed@industrial-academy.iq" },
    update: {},
    create: {
      name: "م. حَمِيْد (Eng. Hameed)",
      email: "hameed@industrial-academy.iq",
      passwordHash,
      role: Role.ADMIN,
      preferredLanguage: Language.AR,
      mfaEnabled: true,
    },
  });
  console.log(`✅ Super Admin created: ${admin.email}`);

  // 2. Seed Demo Student
  const studentPass = await bcrypt.hash("StudentPass2026!", 12);
  const student = await prisma.user.upsert({
    where: { email: "engineer@factory.iq" },
    update: {},
    create: {
      name: "مهندس أتمتة متدرب",
      email: "engineer@factory.iq",
      passwordHash: studentPass,
      role: Role.STUDENT,
      preferredLanguage: Language.AR,
    },
  });
  console.log(`✅ Demo Student created: ${student.email}`);

  // 3. Seed Curriculum Levels (0 through 7)
  const levels = [
    {
      tier: LevelTier.LEVEL_0,
      orderIndex: 0,
      titleAr: "المستوى 0: أساسيات الكهرباء والإلكترونيات الصناعية",
      titleEn: "Level 0: Electrical & Electronic Basics",
      descriptionAr: "فهم الجهد، التيار، قانون أوم، دوائر التيار المستمر والمتردد، المرحلات (Relays)، الكونتاكتورات (Contactors)، وقواطع الدورة.",
      descriptionEn: "Voltage, Current, Ohm's Law, Relays, Contactors, and Circuit Breakers.",
    },
    {
      tier: LevelTier.LEVEL_1,
      orderIndex: 1,
      titleAr: "المستوى 1: مقدمة في الأتمتة الصناعية",
      titleEn: "Level 1: Intro to Industrial Automation",
      descriptionAr: "التحكم اليدوي مقابل الآلي، حلقات التحكم المفتوحة والمغلقة، مقارنة PLC مقابل Microcontroller مقابل DCS، ومقدمة SCADA و HMI.",
      descriptionEn: "Manual vs. Auto, Open/Closed Loops, PLC vs. Microcontroller vs. DCS, Intro to SCADA/HMI.",
    },
    {
      tier: LevelTier.LEVEL_2,
      orderIndex: 2,
      titleAr: "المستوى 2: المتحكم المبرمج من الصفر (PLC from Scratch)",
      titleEn: "Level 2: PLC from Scratch",
      descriptionAr: "المعالج (CPU)، وحدات الإدخال والإخراج (I/O modules)، دورة المسح (Scan Cycle)، ونظرة على Siemens و Rockwell و Schneider.",
      descriptionEn: "CPU, I/O modules, Scan Cycle, Siemens, Allen-Bradley, and Schneider overviews.",
    },
    {
      tier: LevelTier.LEVEL_3,
      orderIndex: 3,
      titleAr: "المستوى 3: البرمجة الصناعية (Industrial Programming)",
      titleEn: "Level 3: Industrial Programming",
      descriptionAr: "لغات البرمجة IEC 61131-3: المخطط السلمي (Ladder Logic)، المؤقتات، العدادات، بتات الذاكرة، والتحكم التتابعي.",
      descriptionEn: "Ladder Logic, FBD, ST, Timers, Counters, Memory Bits, and Sequential Control.",
    },
    {
      tier: LevelTier.LEVEL_4,
      orderIndex: 4,
      titleAr: "المستوى 4: مكونات المصانع وأجهزة الحقل",
      titleEn: "Level 4: Factory Components",
      descriptionAr: "دراسة تفصيلية للأزرار، الحساسات التقاربية والضوئية، مغيرات السرعة (VFDs)، الصمامات الهيدروليكية والنيوماتيكية، ومحركات AC وسيرفو.",
      descriptionEn: "Push Buttons, Proximity/Photoelectric Sensors, VFDs, Solenoids, Pneumatics/Hydraulics, AC/Servo/Stepper Motors.",
    },
    {
      tier: LevelTier.LEVEL_5,
      orderIndex: 5,
      titleAr: "المستوى 5: كيف تعمل المصانع (How Factories Work)",
      titleEn: "Level 5: How Factories Work",
      descriptionAr: "مخططات تفاعلية لخطوط الإنتاج: تعبئة المياه، مصانع الأسمنت، الصناعات الغذائية، وأنظمة الفرز بالسيور الناقلة.",
      descriptionEn: "Process flows of Water Bottling, Cement, Food Processing, Conveyor/Sorting systems.",
    },
    {
      tier: LevelTier.LEVEL_6,
      orderIndex: 6,
      titleAr: "المستوى 6: التحكم المتقدم والثورة الصناعية الرابعة",
      titleEn: "Level 6: Advanced Control",
      descriptionAr: "واجهات HMI و SCADA، بروتوكولات الاتصال (Modbus TCP, OPC UA, PROFINET)، التحكم التناسبي PID، وإنترنت الأشياء الصناعي IIoT.",
      descriptionEn: "HMI, SCADA, Modbus TCP, OPC UA, PROFINET, PID, IIoT, Industry 4.0.",
    },
    {
      tier: LevelTier.LEVEL_7,
      orderIndex: 7,
      titleAr: "المستوى 7: المشاريع الهندسية وخطوط الإنتاج الافتراضية",
      titleEn: "Level 7: Engineering Projects",
      descriptionAr: "مشاريع متكاملة تبدأ من دوائر بدء وإيقاف المحركات وصولاً إلى خط إنتاج وفرز آلي افتراضي متكامل.",
      descriptionEn: "From discrete circuits to virtual integrated production lines with deterministic simulation.",
    },
  ];

  for (const lvl of levels) {
    await prisma.curriculumLevel.upsert({
      where: { tier: lvl.tier },
      update: {},
      create: lvl,
    });
  }
  console.log("✅ Seeded 8 Curriculum Levels (0-7)");

  // 4. Seed Component Categories & Sample Verified Components
  const sensorCat = await prisma.componentCategory.upsert({
    where: { slug: "sensors" },
    update: {},
    create: {
      slug: "sensors",
      nameAr: "الحساسات وأجهزة القياس الميدانية",
      nameEn: "Industrial Sensors",
    },
  });

  await prisma.industrialComponent.upsert({
    where: { slug: "inductive-proximity-sensor" },
    update: {},
    create: {
      categoryId: sensorCat.id,
      slug: "inductive-proximity-sensor",
      nameAr: "حساس التقارب الحثي (Inductive Proximity Sensor)",
      nameEn: "Inductive Proximity Sensor M18",
      partNumber: "Siemens 3RG4013-0AG00 / Schneider XS618B1PAL2",
      manufacturer: "Siemens & Schneider Electric",
      voltageRating: "10 - 30 V DC",
      currentRating: "200 mA output switching current",
      protectionClass: "IP67",
      operatingTemperature: "-25°C to +70°C",
      wiringType: WiringType.PNP,
      workingPrincipleAr: "توليد مجال كهرومغناطيسي عالي التردد عبر ملف داخلي (LC Tank) ورصد التيارات الإعصارية (Eddy Currents) المتولدة في الأجسام المعدنية.",
      workingPrincipleEn: "Radiates high-frequency electromagnetic field detecting eddy-current damping caused by metallic targets.",
      wiringInstructionsAr: "السلك البني (+24V)، الأزرق (0V Common)، الأسود يوصل بمدخل كارت الـ PLC الرقمي بنظام Sinking.",
      wiringInstructionsEn: "Brown (+24V), Blue (0V), Black to PLC Digital Input (Sinking Card).",
      applicationsAr: "عد العلب المعدنية على السيور الناقلة ومفاتيح نهاية الشوط للاسطوانات.",
      applicationsEn: "High-speed metal part counting and pneumatic stroke limit switching.",
      safetyNotesAr: "احترام معاملات تصحيح المواد غير الحديدية وترك مسافة فاصلة لمنع التداخل الكهرومغناطيسي.",
      safetyNotesEn: "Apply reduction factors for non-ferrous metals and space adjacent units 3x diameter.",
    },
  });
  console.log("✅ Seeded Verified Industrial Components");

  // 5. Seed Subscription Plans (Zain Cash, FIB, Stripe)
  await prisma.subscriptionPlan.upsert({
    where: { slug: "monthly-pro" },
    update: {},
    create: {
      slug: "monthly-pro",
      nameAr: "الباقة الشهرية الاحترافية",
      nameEn: "Pro Monthly Automation Access",
      priceIQD: 35000,
      priceUSD: 25.0,
      billingCycle: "MONTHLY",
      featuresAr: ["الوصول لجميع المستويات 0-7", "معمل الـ PLC الافتراضي 2D", "مكتبة المكونات الصناعية", "اختبارات وتفسيرات الأخطاء"],
      featuresEn: ["All Levels 0-7", "2D Virtual PLC Lab", "Industrial Component Library", "Interactive Quizzes with Scientific Feedback"],
    },
  });
  console.log("✅ Seeded Regional Subscription Plans");

  console.log("🎉 Database seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
