import { useState } from 'react'
import './App.css'

/* =========================================================
   TRANSLATIONS
   ========================================================= */

const translations = {
  en: {
    title: 'Cooperative & Legal Helpdesk',
    subtitle: 'AI-powered assistance for cooperative members',
    online: 'AI Helpdesk Online',

    trusted: 'TRUSTED COOPERATIVE GUIDANCE',
    welcome: 'How can we help you today?',
    tagline: 'Your cooperative questions, simplified.',
    welcomeCopy:
      'Get clear, source-backed guidance on elections, member rights, registration and grievances.',

    sourceBacked: 'Source-backed answers',
    guided: 'Guided procedures',
    multilingual: 'Multilingual support',

    election: 'Election & Voting',
    electionDesc: 'Understand voting rights and election procedures',
    electionQuestion: 'Can I vote in the cooperative election?',

    memberRights: 'Member Rights',
    memberRightsDesc: 'Learn about your rights as a cooperative member',
    memberRightsQuestion: 'What are my legal rights as a member?',

    grievance: 'File a Grievance',
    grievanceDesc: 'Get guided through the grievance process',
    grievanceQuestion: 'How do I file a grievance?',

    register: 'Register a Cooperative',
    registerDesc: 'Learn the steps for cooperative registration',
    registerQuestion: 'How do I register a cooperative?',

    governanceAgent: 'Governance Agent',
    legalAgent: 'Legal Agent',
    grievanceAgent: 'Grievance Agent',

    sources: 'Sources',
    page: 'Page',

    preparing: 'Preparing your answer...',
    searching: 'Searching cooperative information...',

    errorTitle: 'Something went wrong.',
    dismiss: 'Dismiss',
    connectionError: 'Could not connect to the backend.',

    guidedProcedure: 'GUIDED PROCEDURE',
    procedureComplete: 'GUIDED PROCEDURE COMPLETE',
    grievanceReady: 'Grievance ready for submission',
    mockCollected:
      'Your details have been collected in this mock flow. No grievance has been submitted.',
    close: 'Close',

    step: 'Step',
    of: 'of',

    grievanceAbout: 'What is your grievance about?',
    describeIssue: 'Describe the issue',
    describeHint: 'Briefly tell us what happened and when.',
    supportingDocuments: 'Supporting documents',
    reviewSubmit: 'Review and submit',
    reviewHint:
      'Review your information before marking the grievance ready for submission.',

    electionOption: 'Election',
    managementOption: 'Management',
    membershipOption: 'Membership',
    otherOption: 'Other',

    haveDocuments: 'I have documents to attach',
    noDocuments: 'I do not have documents',

    describePlaceholder: 'Describe your grievance...',
    readyReview: 'Your grievance details are ready to review.',
    mockPreview: 'This is a mock preview only.',

    back: 'Back',
    cancel: 'Cancel',
    next: 'Next',
    submit: 'Submit',

    inputPlaceholder:
      'Ask about elections, rights, registration or grievances...',
    inputLabel: 'Type your cooperative or legal question',
    send: 'Send',
    chooseLanguage: 'Choose language',

    disclaimer:
      'For general guidance only. Please consult a qualified professional for legal advice.',

    you: 'You',
    helpdesk: 'Cooperative Helpdesk',
  },

  hi: {
    title: 'सहकारी एवं कानूनी सहायता केंद्र',
    subtitle: 'सहकारी सदस्यों के लिए AI आधारित सहायता',
    online: 'AI सहायता केंद्र ऑनलाइन',

    trusted: 'विश्वसनीय सहकारी मार्गदर्शन',
    welcome: 'आज हम आपकी कैसे मदद कर सकते हैं?',
    tagline: 'आपके सहकारी प्रश्नों को आसान बनाएं।',
    welcomeCopy:
      'चुनाव, सदस्य अधिकार, पंजीकरण और शिकायतों पर स्पष्ट एवं स्रोत-आधारित मार्गदर्शन प्राप्त करें।',

    sourceBacked: 'स्रोत-आधारित उत्तर',
    guided: 'निर्देशित प्रक्रियाएं',
    multilingual: 'बहुभाषी सहायता',

    election: 'चुनाव और मतदान',
    electionDesc: 'मतदान अधिकार और चुनाव प्रक्रिया समझें',
    electionQuestion: 'क्या मैं सहकारी चुनाव में मतदान कर सकता हूं?',

    memberRights: 'सदस्य अधिकार',
    memberRightsDesc: 'सहकारी सदस्य के रूप में अपने अधिकार जानें',
    memberRightsQuestion: 'एक सदस्य के रूप में मेरे कानूनी अधिकार क्या हैं?',

    grievance: 'शिकायत दर्ज करें',
    grievanceDesc: 'शिकायत प्रक्रिया के माध्यम से मार्गदर्शन प्राप्त करें',
    grievanceQuestion: 'मैं शिकायत कैसे दर्ज कर सकता हूं?',

    register: 'सहकारी संस्था पंजीकृत करें',
    registerDesc: 'सहकारी पंजीकरण के चरण जानें',
    registerQuestion: 'मैं सहकारी संस्था का पंजीकरण कैसे करूं?',

    governanceAgent: 'शासन एजेंट',
    legalAgent: 'कानूनी एजेंट',
    grievanceAgent: 'शिकायत एजेंट',

    sources: 'स्रोत',
    page: 'पृष्ठ',

    preparing: 'आपका उत्तर तैयार किया जा रहा है...',
    searching: 'सहकारी जानकारी खोजी जा रही है...',

    errorTitle: 'कुछ गलत हो गया।',
    dismiss: 'बंद करें',
    connectionError: 'बैकएंड से कनेक्ट नहीं हो सका।',

    guidedProcedure: 'निर्देशित प्रक्रिया',
    procedureComplete: 'निर्देशित प्रक्रिया पूर्ण',
    grievanceReady: 'शिकायत जमा करने के लिए तैयार है',
    mockCollected:
      'आपकी जानकारी इस डेमो प्रक्रिया में एकत्र की गई है। कोई शिकायत जमा नहीं की गई है।',
    close: 'बंद करें',

    step: 'चरण',
    of: 'में से',

    grievanceAbout: 'आपकी शिकायत किस बारे में है?',
    describeIssue: 'समस्या का विवरण दें',
    describeHint: 'संक्षेप में बताएं कि क्या हुआ और कब हुआ।',
    supportingDocuments: 'सहायक दस्तावेज',
    reviewSubmit: 'समीक्षा और जमा करें',
    reviewHint:
      'शिकायत जमा करने के लिए तैयार करने से पहले अपनी जानकारी की समीक्षा करें।',

    electionOption: 'चुनाव',
    managementOption: 'प्रबंधन',
    membershipOption: 'सदस्यता',
    otherOption: 'अन्य',

    haveDocuments: 'मेरे पास संलग्न करने के लिए दस्तावेज हैं',
    noDocuments: 'मेरे पास दस्तावेज नहीं हैं',

    describePlaceholder: 'अपनी शिकायत का विवरण दें...',
    readyReview: 'आपकी शिकायत की जानकारी समीक्षा के लिए तैयार है।',
    mockPreview: 'यह केवल एक डेमो पूर्वावलोकन है।',

    back: 'पीछे',
    cancel: 'रद्द करें',
    next: 'अगला',
    submit: 'जमा करें',

    inputPlaceholder: 'चुनाव, अधिकार, पंजीकरण या शिकायत के बारे में पूछें...',
    inputLabel: 'अपना सहकारी या कानूनी प्रश्न लिखें',
    send: 'भेजें',
    chooseLanguage: 'भाषा चुनें',

    disclaimer:
      'केवल सामान्य मार्गदर्शन के लिए। कानूनी सलाह के लिए योग्य पेशेवर से संपर्क करें।',

    you: 'आप',
    helpdesk: 'सहकारी सहायता केंद्र',
  },

  mr: {
    title: 'सहकारी आणि कायदेशीर मदत केंद्र',
    subtitle: 'सहकारी सदस्यांसाठी AI आधारित सहाय्य',
    online: 'AI मदत केंद्र ऑनलाइन',

    trusted: 'विश्वसनीय सहकारी मार्गदर्शन',
    welcome: 'आज आम्ही तुमची कशी मदत करू शकतो?',
    tagline: 'तुमचे सहकारी प्रश्न सोपे करा.',
    welcomeCopy:
      'निवडणूक, सदस्यांचे अधिकार, नोंदणी आणि तक्रारींबाबत स्पष्ट आणि स्रोत-आधारित मार्गदर्शन मिळवा.',

    sourceBacked: 'स्रोत-आधारित उत्तरे',
    guided: 'मार्गदर्शित प्रक्रिया',
    multilingual: 'बहुभाषिक सहाय्य',

    election: 'निवडणूक आणि मतदान',
    electionDesc: 'मतदानाचे अधिकार आणि निवडणूक प्रक्रिया समजून घ्या',
    electionQuestion: 'मी सहकारी निवडणुकीत मतदान करू शकतो का?',

    memberRights: 'सदस्यांचे अधिकार',
    memberRightsDesc: 'सहकारी सदस्य म्हणून तुमचे अधिकार जाणून घ्या',
    memberRightsQuestion: 'सदस्य म्हणून माझे कायदेशीर अधिकार कोणते आहेत?',

    grievance: 'तक्रार दाखल करा',
    grievanceDesc: 'तक्रार प्रक्रियेत मार्गदर्शन मिळवा',
    grievanceQuestion: 'मी तक्रार कशी दाखल करू?',

    register: 'सहकारी संस्था नोंदणी',
    registerDesc: 'सहकारी संस्थेच्या नोंदणीचे टप्पे जाणून घ्या',
    registerQuestion: 'मी सहकारी संस्थेची नोंदणी कशी करू?',

    governanceAgent: 'प्रशासन एजंट',
    legalAgent: 'कायदेशीर एजंट',
    grievanceAgent: 'तक्रार एजंट',

    sources: 'स्रोत',
    page: 'पृष्ठ',

    preparing: 'तुमचे उत्तर तयार केले जात आहे...',
    searching: 'सहकारी माहिती शोधली जात आहे...',

    errorTitle: 'काहीतरी चूक झाली.',
    dismiss: 'बंद करा',
    connectionError: 'बॅकएंडशी कनेक्ट करता आले नाही.',

    guidedProcedure: 'मार्गदर्शित प्रक्रिया',
    procedureComplete: 'मार्गदर्शित प्रक्रिया पूर्ण',
    grievanceReady: 'तक्रार सादर करण्यासाठी तयार आहे',
    mockCollected:
      'तुमची माहिती या डेमो प्रक्रियेत गोळा करण्यात आली आहे. कोणतीही तक्रार सादर केलेली नाही.',
    close: 'बंद करा',

    step: 'टप्पा',
    of: 'पैकी',

    grievanceAbout: 'तुमची तक्रार कशाबद्दल आहे?',
    describeIssue: 'समस्येचे वर्णन करा',
    describeHint: 'काय झाले आणि कधी झाले ते थोडक्यात सांगा.',
    supportingDocuments: 'सहाय्यक कागदपत्रे',
    reviewSubmit: 'पुनरावलोकन आणि सादर करा',
    reviewHint:
      'तक्रार सादर करण्यासाठी तयार करण्यापूर्वी तुमची माहिती तपासा.',

    electionOption: 'निवडणूक',
    managementOption: 'व्यवस्थापन',
    membershipOption: 'सदस्यत्व',
    otherOption: 'इतर',

    haveDocuments: 'माझ्याकडे जोडण्यासाठी कागदपत्रे आहेत',
    noDocuments: 'माझ्याकडे कागदपत्रे नाहीत',

    describePlaceholder: 'तुमच्या तक्रारीचे वर्णन करा...',
    readyReview: 'तुमच्या तक्रारीची माहिती पुनरावलोकनासाठी तयार आहे.',
    mockPreview: 'हे फक्त डेमो पूर्वावलोकन आहे.',

    back: 'मागे',
    cancel: 'रद्द करा',
    next: 'पुढे',
    submit: 'सादर करा',

    inputPlaceholder: 'निवडणूक, अधिकार, नोंदणी किंवा तक्रारीबद्दल विचारा...',
    inputLabel: 'तुमचा सहकारी किंवा कायदेशीर प्रश्न लिहा',
    send: 'पाठवा',
    chooseLanguage: 'भाषा निवडा',

    disclaimer:
      'केवळ सामान्य मार्गदर्शनासाठी. कायदेशीर सल्ल्यासाठी पात्र व्यावसायिकांचा सल्ला घ्या.',

    you: 'तुम्ही',
    helpdesk: 'सहकारी मदत केंद्र',
  },

  bn: {
    title: 'সমবায় ও আইনগত সহায়তা কেন্দ্র',
    subtitle: 'সমবায় সদস্যদের জন্য AI সহায়তা',
    online: 'AI সহায়তা কেন্দ্র অনলাইন',

    trusted: 'বিশ্বস্ত সমবায় নির্দেশনা',
    welcome: 'আজ আমরা কীভাবে আপনাকে সাহায্য করতে পারি?',
    tagline: 'আপনার সমবায় প্রশ্ন সহজ করুন।',
    welcomeCopy:
      'নির্বাচন, সদস্য অধিকার, নিবন্ধন এবং অভিযোগ সম্পর্কে স্পষ্ট ও উৎস-ভিত্তিক নির্দেশনা পান।',

    sourceBacked: 'উৎস-ভিত্তিক উত্তর',
    guided: 'নির্দেশিত প্রক্রিয়া',
    multilingual: 'বহুভাষিক সহায়তা',

    election: 'নির্বাচন ও ভোটদান',
    electionDesc: 'ভোটাধিকার এবং নির্বাচনী প্রক্রিয়া বুঝুন',
    electionQuestion: 'আমি কি সমবায় নির্বাচনে ভোট দিতে পারি?',

    memberRights: 'সদস্যের অধিকার',
    memberRightsDesc: 'সমবায় সদস্য হিসেবে আপনার অধিকার জানুন',
    memberRightsQuestion: 'সদস্য হিসেবে আমার আইনগত অধিকার কী?',

    grievance: 'অভিযোগ দাখিল করুন',
    grievanceDesc: 'অভিযোগ প্রক্রিয়ায় নির্দেশনা পান',
    grievanceQuestion: 'আমি কীভাবে অভিযোগ দাখিল করব?',

    register: 'সমবায় নিবন্ধন করুন',
    registerDesc: 'সমবায় নিবন্ধনের ধাপগুলি জানুন',
    registerQuestion: 'আমি কীভাবে একটি সমবায় নিবন্ধন করব?',

    governanceAgent: 'শাসন এজেন্ট',
    legalAgent: 'আইনি এজেন্ট',
    grievanceAgent: 'অভিযোগ এজেন্ট',

    sources: 'উৎস',
    page: 'পৃষ্ঠা',

    preparing: 'আপনার উত্তর প্রস্তুত করা হচ্ছে...',
    searching: 'সমবায় তথ্য অনুসন্ধান করা হচ্ছে...',

    errorTitle: 'কিছু ভুল হয়েছে।',
    dismiss: 'বন্ধ করুন',
    connectionError: 'ব্যাকএন্ডের সাথে সংযোগ করা যায়নি।',

    guidedProcedure: 'নির্দেশিত প্রক্রিয়া',
    procedureComplete: 'নির্দেশিত প্রক্রিয়া সম্পন্ন',
    grievanceReady: 'অভিযোগ জমা দেওয়ার জন্য প্রস্তুত',
    mockCollected:
      'এই ডেমো প্রক্রিয়ায় আপনার তথ্য সংগ্রহ করা হয়েছে। কোনো অভিযোগ জমা দেওয়া হয়নি।',
    close: 'বন্ধ করুন',

    step: 'ধাপ',
    of: 'এর মধ্যে',

    grievanceAbout: 'আপনার অভিযোগ কী নিয়ে?',
    describeIssue: 'সমস্যার বর্ণনা দিন',
    describeHint: 'কী ঘটেছে এবং কখন ঘটেছে তা সংক্ষেপে জানান।',
    supportingDocuments: 'সহায়ক নথি',
    reviewSubmit: 'পর্যালোচনা ও জমা দিন',
    reviewHint:
      'অভিযোগ জমা দেওয়ার আগে আপনার তথ্য পর্যালোচনা করুন।',

    electionOption: 'নির্বাচন',
    managementOption: 'ব্যবস্থাপনা',
    membershipOption: 'সদস্যপদ',
    otherOption: 'অন্যান্য',

    haveDocuments: 'আমার কাছে সংযুক্ত করার নথি আছে',
    noDocuments: 'আমার কাছে কোনো নথি নেই',

    describePlaceholder: 'আপনার অভিযোগের বর্ণনা দিন...',
    readyReview: 'আপনার অভিযোগের তথ্য পর্যালোচনার জন্য প্রস্তুত।',
    mockPreview: 'এটি শুধুমাত্র একটি ডেমো প্রিভিউ।',

    back: 'পেছনে',
    cancel: 'বাতিল',
    next: 'পরবর্তী',
    submit: 'জমা দিন',

    inputPlaceholder: 'নির্বাচন, অধিকার, নিবন্ধন বা অভিযোগ সম্পর্কে জিজ্ঞাসা করুন...',
    inputLabel: 'আপনার সমবায় বা আইনগত প্রশ্ন লিখুন',
    send: 'পাঠান',
    chooseLanguage: 'ভাষা নির্বাচন করুন',

    disclaimer:
      'শুধুমাত্র সাধারণ নির্দেশনার জন্য। আইনগত পরামর্শের জন্য যোগ্য পেশাদারের সঙ্গে পরামর্শ করুন।',

    you: 'আপনি',
    helpdesk: 'সমবায় সহায়তা কেন্দ্র',
  },

  ta: {
    title: 'கூட்டுறவு மற்றும் சட்ட உதவி மையம்',
    subtitle: 'கூட்டுறவு உறுப்பினர்களுக்கான AI உதவி',
    online: 'AI உதவி மையம் ஆன்லைனில்',

    trusted: 'நம்பகமான கூட்டுறவு வழிகாட்டுதல்',
    welcome: 'இன்று நாங்கள் உங்களுக்கு எவ்வாறு உதவலாம்?',
    tagline: 'உங்கள் கூட்டுறவு கேள்விகளை எளிமையாக்குங்கள்.',
    welcomeCopy:
      'தேர்தல், உறுப்பினர் உரிமைகள், பதிவு மற்றும் புகார்கள் குறித்து தெளிவான தகவல்களைப் பெறுங்கள்.',

    sourceBacked: 'ஆதார அடிப்படையிலான பதில்கள்',
    guided: 'வழிகாட்டப்பட்ட நடைமுறைகள்',
    multilingual: 'பல்மொழி ஆதரவு',

    election: 'தேர்தல் மற்றும் வாக்களிப்பு',
    electionDesc: 'வாக்களிக்கும் உரிமைகள் மற்றும் தேர்தல் நடைமுறைகளை அறியவும்',
    electionQuestion: 'நான் கூட்டுறவு தேர்தலில் வாக்களிக்க முடியுமா?',

    memberRights: 'உறுப்பினர் உரிமைகள்',
    memberRightsDesc: 'கூட்டுறவு உறுப்பினராக உங்கள் உரிமைகளை அறியவும்',
    memberRightsQuestion: 'உறுப்பினராக எனது சட்ட உரிமைகள் என்ன?',

    grievance: 'புகார் அளிக்கவும்',
    grievanceDesc: 'புகார் நடைமுறையில் வழிகாட்டுதலைப் பெறுங்கள்',
    grievanceQuestion: 'நான் எப்படி புகார் அளிப்பது?',

    register: 'கூட்டுறவை பதிவு செய்யவும்',
    registerDesc: 'கூட்டுறவு பதிவு செய்யும் படிகளை அறியவும்',
    registerQuestion: 'நான் கூட்டுறவை எவ்வாறு பதிவு செய்வது?',

    governanceAgent: 'நிர்வாக முகவர்',
    legalAgent: 'சட்ட முகவர்',
    grievanceAgent: 'புகார் முகவர்',

    sources: 'ஆதாரங்கள்',
    page: 'பக்கம்',

    preparing: 'உங்கள் பதில் தயாராகிறது...',
    searching: 'கூட்டுறவு தகவல்கள் தேடப்படுகின்றன...',

    errorTitle: 'ஏதோ தவறு ஏற்பட்டது.',
    dismiss: 'மூடு',
    connectionError: 'Backend உடன் இணைக்க முடியவில்லை.',

    guidedProcedure: 'வழிகாட்டப்பட்ட நடைமுறை',
    procedureComplete: 'வழிகாட்டப்பட்ட நடைமுறை முடிந்தது',
    grievanceReady: 'புகார் சமர்ப்பிக்க தயாராக உள்ளது',
    mockCollected:
      'இந்த டெமோ நடைமுறையில் உங்கள் விவரங்கள் சேகரிக்கப்பட்டுள்ளன. எந்த புகாரும் சமர்ப்பிக்கப்படவில்லை.',
    close: 'மூடு',

    step: 'படி',
    of: 'இல்',

    grievanceAbout: 'உங்கள் புகார் எதைப் பற்றியது?',
    describeIssue: 'சிக்கலை விவரிக்கவும்',
    describeHint: 'என்ன நடந்தது, எப்போது நடந்தது என்பதை சுருக்கமாக கூறவும்.',
    supportingDocuments: 'ஆதார ஆவணங்கள்',
    reviewSubmit: 'மதிப்பாய்வு செய்து சமர்ப்பிக்கவும்',
    reviewHint:
      'புகாரைத் தயாரிப்பதற்கு முன் உங்கள் தகவல்களை மதிப்பாய்வு செய்யவும்.',

    electionOption: 'தேர்தல்',
    managementOption: 'நிர்வாகம்',
    membershipOption: 'உறுப்பினர்',
    otherOption: 'மற்றவை',

    haveDocuments: 'இணைக்க ஆவணங்கள் உள்ளன',
    noDocuments: 'என்னிடம் ஆவணங்கள் இல்லை',

    describePlaceholder: 'உங்கள் புகாரை விவரிக்கவும்...',
    readyReview: 'உங்கள் புகார் விவரங்கள் மதிப்பாய்வுக்கு தயாராக உள்ளன.',
    mockPreview: 'இது ஒரு டெமோ முன்னோட்டம் மட்டுமே.',

    back: 'பின்செல்',
    cancel: 'ரத்து',
    next: 'அடுத்து',
    submit: 'சமர்ப்பிக்கவும்',

    inputPlaceholder:
      'தேர்தல், உரிமைகள், பதிவு அல்லது புகார்கள் பற்றி கேளுங்கள்...',
    inputLabel: 'உங்கள் கூட்டுறவு அல்லது சட்ட கேள்வியை உள்ளிடவும்',
    send: 'அனுப்பு',
    chooseLanguage: 'மொழியைத் தேர்ந்தெடுக்கவும்',

    disclaimer:
      'பொதுவான வழிகாட்டுதலுக்காக மட்டுமே. சட்ட ஆலோசனைக்கு தகுதியான நிபுணரை அணுகவும்.',

    you: 'நீங்கள்',
    helpdesk: 'கூட்டுறவு உதவி மையம்',
  },

  te: {
    title: 'సహకార మరియు న్యాయ సహాయ కేంద్రం',
    subtitle: 'సహకార సభ్యుల కోసం AI సహాయం',
    online: 'AI సహాయ కేంద్రం ఆన్‌లైన్‌లో ఉంది',

    trusted: 'విశ్వసనీయ సహకార మార్గదర్శకం',
    welcome: 'ఈరోజు మేము మీకు ఎలా సహాయం చేయగలం?',
    tagline: 'మీ సహకార ప్రశ్నలను సులభతరం చేయండి.',
    welcomeCopy:
      'ఎన్నికలు, సభ్యుల హక్కులు, నమోదు మరియు ఫిర్యాదులపై స్పష్టమైన, మూలాధారిత మార్గదర్శకత్వం పొందండి.',

    sourceBacked: 'మూలాధారిత సమాధానాలు',
    guided: 'మార్గదర్శక విధానాలు',
    multilingual: 'బహుభాషా మద్దతు',

    election: 'ఎన్నికలు మరియు ఓటింగ్',
    electionDesc: 'ఓటింగ్ హక్కులు మరియు ఎన్నికల విధానాలను అర్థం చేసుకోండి',
    electionQuestion: 'నేను సహకార ఎన్నికల్లో ఓటు వేయగలనా?',

    memberRights: 'సభ్యుల హక్కులు',
    memberRightsDesc: 'సహకార సభ్యుడిగా మీ హక్కులను తెలుసుకోండి',
    memberRightsQuestion: 'సభ్యుడిగా నా చట్టపరమైన హక్కులు ఏమిటి?',

    grievance: 'ఫిర్యాదు నమోదు చేయండి',
    grievanceDesc: 'ఫిర్యాదు ప్రక్రియలో మార్గదర్శకత్వం పొందండి',
    grievanceQuestion: 'నేను ఫిర్యాదును ఎలా నమోదు చేయాలి?',

    register: 'సహకార సంస్థను నమోదు చేయండి',
    registerDesc: 'సహకార సంస్థ నమోదు దశలను తెలుసుకోండి',
    registerQuestion: 'నేను సహకార సంస్థను ఎలా నమోదు చేయాలి?',

    governanceAgent: 'పాలన ఏజెంట్',
    legalAgent: 'న్యాయ ఏజెంట్',
    grievanceAgent: 'ఫిర్యాదు ఏజెంట్',

    sources: 'మూలాలు',
    page: 'పేజీ',

    preparing: 'మీ సమాధానం సిద్ధమవుతోంది...',
    searching: 'సహకార సమాచారాన్ని వెతుకుతోంది...',

    errorTitle: 'ఏదో తప్పు జరిగింది.',
    dismiss: 'మూసివేయండి',
    connectionError: 'బ్యాకెండ్‌కు కనెక్ట్ కాలేకపోయాము.',

    guidedProcedure: 'మార్గదర్శక విధానం',
    procedureComplete: 'మార్గదర్శక విధానం పూర్తయింది',
    grievanceReady: 'ఫిర్యాదు సమర్పించడానికి సిద్ధంగా ఉంది',
    mockCollected:
      'ఈ డెమో విధానంలో మీ వివరాలు సేకరించబడ్డాయి. ఎటువంటి ఫిర్యాదు సమర్పించబడలేదు.',
    close: 'మూసివేయండి',

    step: 'దశ',
    of: 'లో',

    grievanceAbout: 'మీ ఫిర్యాదు దేనికి సంబంధించినది?',
    describeIssue: 'సమస్యను వివరించండి',
    describeHint: 'ఏం జరిగింది మరియు ఎప్పుడు జరిగిందో సంక్షిప్తంగా చెప్పండి.',
    supportingDocuments: 'సహాయక పత్రాలు',
    reviewSubmit: 'సమీక్షించి సమర్పించండి',
    reviewHint:
      'ఫిర్యాదును సిద్ధం చేయడానికి ముందు మీ సమాచారాన్ని సమీక్షించండి.',

    electionOption: 'ఎన్నిక',
    managementOption: 'నిర్వహణ',
    membershipOption: 'సభ్యత్వం',
    otherOption: 'ఇతర',

    haveDocuments: 'జతచేయడానికి నా వద్ద పత్రాలు ఉన్నాయి',
    noDocuments: 'నా వద్ద పత్రాలు లేవు',

    describePlaceholder: 'మీ ఫిర్యాదును వివరించండి...',
    readyReview: 'మీ ఫిర్యాదు వివరాలు సమీక్షకు సిద్ధంగా ఉన్నాయి.',
    mockPreview: 'ఇది డెమో ప్రివ్యూ మాత్రమే.',

    back: 'వెనుకకు',
    cancel: 'రద్దు',
    next: 'తదుపరి',
    submit: 'సమర్పించండి',

    inputPlaceholder:
      'ఎన్నికలు, హక్కులు, నమోదు లేదా ఫిర్యాదుల గురించి అడగండి...',
    inputLabel: 'మీ సహకార లేదా న్యాయ ప్రశ్నను టైప్ చేయండి',
    send: 'పంపండి',
    chooseLanguage: 'భాషను ఎంచుకోండి',

    disclaimer:
      'సాధారణ మార్గదర్శకత్వం కోసం మాత్రమే. న్యాయ సలహా కోసం అర్హత కలిగిన నిపుణుడిని సంప్రదించండి.',

    you: 'మీరు',
    helpdesk: 'సహకార సహాయ కేంద్రం',
  },

  kn: {
    title: 'ಸಹಕಾರಿ ಮತ್ತು ಕಾನೂನು ಸಹಾಯ ಕೇಂದ್ರ',
    subtitle: 'ಸಹಕಾರಿ ಸದಸ್ಯರಿಗೆ AI ಆಧಾರಿತ ಸಹಾಯ',
    online: 'AI ಸಹಾಯ ಕೇಂದ್ರ ಆನ್‌ಲೈನ್‌ನಲ್ಲಿದೆ',

    trusted: 'ವಿಶ್ವಾಸಾರ್ಹ ಸಹಕಾರಿ ಮಾರ್ಗದರ್ಶನ',
    welcome: 'ಇಂದು ನಾವು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?',
    tagline: 'ನಿಮ್ಮ ಸಹಕಾರಿ ಪ್ರಶ್ನೆಗಳನ್ನು ಸರಳಗೊಳಿಸಿ.',
    welcomeCopy:
      'ಚುನಾವಣೆ, ಸದಸ್ಯರ ಹಕ್ಕುಗಳು, ನೋಂದಣಿ ಮತ್ತು ದೂರುಗಳ ಕುರಿತು ಸ್ಪಷ್ಟವಾದ, ಮೂಲಾಧಾರಿತ ಮಾರ್ಗದರ್ಶನ ಪಡೆಯಿರಿ.',

    sourceBacked: 'ಮೂಲಾಧಾರಿತ ಉತ್ತರಗಳು',
    guided: 'ಮಾರ್ಗದರ್ಶಿತ ಪ್ರಕ್ರಿಯೆಗಳು',
    multilingual: 'ಬಹುಭಾಷಾ ಬೆಂಬಲ',

    election: 'ಚುನಾವಣೆ ಮತ್ತು ಮತದಾನ',
    electionDesc: 'ಮತದಾನದ ಹಕ್ಕುಗಳು ಮತ್ತು ಚುನಾವಣಾ ಪ್ರಕ್ರಿಯೆಗಳನ್ನು ತಿಳಿಯಿರಿ',
    electionQuestion: 'ನಾನು ಸಹಕಾರಿ ಚುನಾವಣೆಯಲ್ಲಿ ಮತ ಚಲಾಯಿಸಬಹುದೇ?',

    memberRights: 'ಸದಸ್ಯರ ಹಕ್ಕುಗಳು',
    memberRightsDesc: 'ಸಹಕಾರಿ ಸದಸ್ಯರಾಗಿ ನಿಮ್ಮ ಹಕ್ಕುಗಳನ್ನು ತಿಳಿಯಿರಿ',
    memberRightsQuestion: 'ಸದಸ್ಯನಾಗಿ ನನ್ನ ಕಾನೂನು ಹಕ್ಕುಗಳು ಯಾವುವು?',

    grievance: 'ದೂರು ದಾಖಲಿಸಿ',
    grievanceDesc: 'ದೂರು ಪ್ರಕ್ರಿಯೆಯಲ್ಲಿ ಮಾರ್ಗದರ್ಶನ ಪಡೆಯಿರಿ',
    grievanceQuestion: 'ನಾನು ದೂರು ಹೇಗೆ ದಾಖಲಿಸಬಹುದು?',

    register: 'ಸಹಕಾರಿ ಸಂಸ್ಥೆಯನ್ನು ನೋಂದಾಯಿಸಿ',
    registerDesc: 'ಸಹಕಾರಿ ನೋಂದಣಿಯ ಹಂತಗಳನ್ನು ತಿಳಿಯಿರಿ',
    registerQuestion: 'ನಾನು ಸಹಕಾರಿ ಸಂಸ್ಥೆಯನ್ನು ಹೇಗೆ ನೋಂದಾಯಿಸಬಹುದು?',

    governanceAgent: 'ಆಡಳಿತ ಏಜೆಂಟ್',
    legalAgent: 'ಕಾನೂನು ಏಜೆಂಟ್',
    grievanceAgent: 'ದೂರು ಏಜೆಂಟ್',

    sources: 'ಮೂಲಗಳು',
    page: 'ಪುಟ',

    preparing: 'ನಿಮ್ಮ ಉತ್ತರವನ್ನು ಸಿದ್ಧಪಡಿಸಲಾಗುತ್ತಿದೆ...',
    searching: 'ಸಹಕಾರಿ ಮಾಹಿತಿಯನ್ನು ಹುಡುಕಲಾಗುತ್ತಿದೆ...',

    errorTitle: 'ಏನೋ ತಪ್ಪಾಗಿದೆ.',
    dismiss: 'ಮುಚ್ಚಿ',
    connectionError: 'ಬ್ಯಾಕೆಂಡ್‌ಗೆ ಸಂಪರ್ಕಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ.',

    guidedProcedure: 'ಮಾರ್ಗದರ್ಶಿತ ಪ್ರಕ್ರಿಯೆ',
    procedureComplete: 'ಮಾರ್ಗದರ್ಶಿತ ಪ್ರಕ್ರಿಯೆ ಪೂರ್ಣಗೊಂಡಿದೆ',
    grievanceReady: 'ದೂರು ಸಲ್ಲಿಸಲು ಸಿದ್ಧವಾಗಿದೆ',
    mockCollected:
      'ಈ ಡೆಮೋ ಪ್ರಕ್ರಿಯೆಯಲ್ಲಿ ನಿಮ್ಮ ವಿವರಗಳನ್ನು ಸಂಗ್ರಹಿಸಲಾಗಿದೆ. ಯಾವುದೇ ದೂರು ಸಲ್ಲಿಸಲಾಗಿಲ್ಲ.',
    close: 'ಮುಚ್ಚಿ',

    step: 'ಹಂತ',
    of: 'ರಲ್ಲಿ',

    grievanceAbout: 'ನಿಮ್ಮ ದೂರು ಯಾವುದರ ಬಗ್ಗೆ?',
    describeIssue: 'ಸಮಸ್ಯೆಯನ್ನು ವಿವರಿಸಿ',
    describeHint: 'ಏನಾಯಿತು ಮತ್ತು ಯಾವಾಗ ಸಂಭವಿಸಿತು ಎಂಬುದನ್ನು ಸಂಕ್ಷಿಪ್ತವಾಗಿ ತಿಳಿಸಿ.',
    supportingDocuments: 'ಪೋಷಕ ದಾಖಲೆಗಳು',
    reviewSubmit: 'ಪರಿಶೀಲಿಸಿ ಮತ್ತು ಸಲ್ಲಿಸಿ',
    reviewHint:
      'ದೂರು ಸಲ್ಲಿಸುವ ಮೊದಲು ನಿಮ್ಮ ಮಾಹಿತಿಯನ್ನು ಪರಿಶೀಲಿಸಿ.',

    electionOption: 'ಚುನಾವಣೆ',
    managementOption: 'ನಿರ್ವಹಣೆ',
    membershipOption: 'ಸದಸ್ಯತ್ವ',
    otherOption: 'ಇತರೆ',

    haveDocuments: 'ಲಗತ್ತಿಸಲು ನನ್ನ ಬಳಿ ದಾಖಲೆಗಳಿವೆ',
    noDocuments: 'ನನ್ನ ಬಳಿ ದಾಖಲೆಗಳಿಲ್ಲ',

    describePlaceholder: 'ನಿಮ್ಮ ದೂರನ್ನು ವಿವರಿಸಿ...',
    readyReview: 'ನಿಮ್ಮ ದೂರಿನ ವಿವರಗಳು ಪರಿಶೀಲನೆಗೆ ಸಿದ್ಧವಾಗಿವೆ.',
    mockPreview: 'ಇದು ಕೇವಲ ಡೆಮೋ ಪೂರ್ವವೀಕ್ಷಣೆ.',

    back: 'ಹಿಂದೆ',
    cancel: 'ರದ್ದುಮಾಡಿ',
    next: 'ಮುಂದೆ',
    submit: 'ಸಲ್ಲಿಸಿ',

    inputPlaceholder:
      'ಚುನಾವಣೆ, ಹಕ್ಕುಗಳು, ನೋಂದಣಿ ಅಥವಾ ದೂರುಗಳ ಬಗ್ಗೆ ಕೇಳಿ...',
    inputLabel: 'ನಿಮ್ಮ ಸಹಕಾರಿ ಅಥವಾ ಕಾನೂನು ಪ್ರಶ್ನೆಯನ್ನು ನಮೂದಿಸಿ',
    send: 'ಕಳುಹಿಸಿ',
    chooseLanguage: 'ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ',

    disclaimer:
      'ಸಾಮಾನ್ಯ ಮಾರ್ಗದರ್ಶನಕ್ಕಾಗಿ ಮಾತ್ರ. ಕಾನೂನು ಸಲಹೆಗಾಗಿ ಅರ್ಹ ವೃತ್ತಿಪರರನ್ನು ಸಂಪರ್ಕಿಸಿ.',

    you: 'ನೀವು',
    helpdesk: 'ಸಹಕಾರಿ ಸಹಾಯ ಕೇಂದ್ರ',
  },

  gu: {
    title: 'સહકારી અને કાનૂની સહાય કેન્દ્ર',
    subtitle: 'સહકારી સભ્યો માટે AI આધારિત સહાય',
    online: 'AI સહાય કેન્દ્ર ઓનલાઇન',

    trusted: 'વિશ્વસનીય સહકારી માર્ગદર્શન',
    welcome: 'આજે અમે તમારી કેવી રીતે મદદ કરી શકીએ?',
    tagline: 'તમારા સહકારી પ્રશ્નોને સરળ બનાવો.',
    welcomeCopy:
      'ચૂંટણી, સભ્ય અધિકારો, નોંધણી અને ફરિયાદો અંગે સ્પષ્ટ અને સ્રોત આધારિત માર્ગદર્શન મેળવો.',

    sourceBacked: 'સ્રોત આધારિત જવાબો',
    guided: 'માર્ગદર્શિત પ્રક્રિયાઓ',
    multilingual: 'બહુભાષી સહાય',

    election: 'ચૂંટણી અને મતદાન',
    electionDesc: 'મતદાન અધિકારો અને ચૂંટણી પ્રક્રિયાઓ સમજો',
    electionQuestion: 'શું હું સહકારી ચૂંટણીમાં મત આપી શકું?',

    memberRights: 'સભ્ય અધિકારો',
    memberRightsDesc: 'સહકારી સભ્ય તરીકે તમારા અધિકારો જાણો',
    memberRightsQuestion: 'સભ્ય તરીકે મારા કાનૂની અધિકારો શું છે?',

    grievance: 'ફરિયાદ નોંધાવો',
    grievanceDesc: 'ફરિયાદ પ્રક્રિયામાં માર્ગદર્શન મેળવો',
    grievanceQuestion: 'હું ફરિયાદ કેવી રીતે નોંધાવી શકું?',

    register: 'સહકારી સંસ્થા નોંધાવો',
    registerDesc: 'સહકારી નોંધણીના પગલાં જાણો',
    registerQuestion: 'હું સહકારી સંસ્થાની નોંધણી કેવી રીતે કરું?',

    governanceAgent: 'શાસન એજન્ટ',
    legalAgent: 'કાનૂની એજન્ટ',
    grievanceAgent: 'ફરિયાદ એજન્ટ',

    sources: 'સ્રોતો',
    page: 'પૃષ્ઠ',

    preparing: 'તમારો જવાબ તૈયાર કરવામાં આવી રહ્યો છે...',
    searching: 'સહકારી માહિતી શોધવામાં આવી રહી છે...',

    errorTitle: 'કંઈક ખોટું થયું.',
    dismiss: 'બંધ કરો',
    connectionError: 'બેકએન્ડ સાથે કનેક્ટ થઈ શક્યું નથી.',

    guidedProcedure: 'માર્ગદર્શિત પ્રક્રિયા',
    procedureComplete: 'માર્ગદર્શિત પ્રક્રિયા પૂર્ણ',
    grievanceReady: 'ફરિયાદ સબમિટ કરવા માટે તૈયાર છે',
    mockCollected:
      'આ ડેમો પ્રક્રિયામાં તમારી વિગતો એકત્રિત કરવામાં આવી છે. કોઈ ફરિયાદ સબમિટ કરવામાં આવી નથી.',
    close: 'બંધ કરો',

    step: 'પગલું',
    of: 'માંથી',

    grievanceAbout: 'તમારી ફરિયાદ શેના વિશે છે?',
    describeIssue: 'સમસ્યાનું વર્ણન કરો',
    describeHint: 'શું થયું અને ક્યારે થયું તે સંક્ષેપમાં જણાવો.',
    supportingDocuments: 'સહાયક દસ્તાવેજો',
    reviewSubmit: 'સમીક્ષા કરો અને સબમિટ કરો',
    reviewHint:
      'ફરિયાદ તૈયાર કરતા પહેલાં તમારી માહિતીની સમીક્ષા કરો.',

    electionOption: 'ચૂંટણી',
    managementOption: 'વ્યવસ્થાપન',
    membershipOption: 'સભ્યપદ',
    otherOption: 'અન્ય',

    haveDocuments: 'મારી પાસે જોડવા માટે દસ્તાવેજો છે',
    noDocuments: 'મારી પાસે દસ્તાવેજો નથી',

    describePlaceholder: 'તમારી ફરિયાદનું વર્ણન કરો...',
    readyReview: 'તમારી ફરિયાદની વિગતો સમીક્ષા માટે તૈયાર છે.',
    mockPreview: 'આ માત્ર ડેમો પૂર્વાવલોકન છે.',

    back: 'પાછળ',
    cancel: 'રદ કરો',
    next: 'આગળ',
    submit: 'સબમિટ કરો',

    inputPlaceholder:
      'ચૂંટણી, અધિકારો, નોંધણી અથવા ફરિયાદો વિશે પૂછો...',
    inputLabel: 'તમારો સહકારી અથવા કાનૂની પ્રશ્ન લખો',
    send: 'મોકલો',
    chooseLanguage: 'ભાષા પસંદ કરો',

    disclaimer:
      'ફક્ત સામાન્ય માર્ગદર્શન માટે. કાનૂની સલાહ માટે લાયક વ્યાવસાયિકની સલાહ લો.',

    you: 'તમે',
    helpdesk: 'સહકારી સહાય કેન્દ્ર',
  },

  pa: {
    title: 'ਸਹਿਕਾਰੀ ਅਤੇ ਕਾਨੂੰਨੀ ਸਹਾਇਤਾ ਕੇਂਦਰ',
    subtitle: 'ਸਹਿਕਾਰੀ ਮੈਂਬਰਾਂ ਲਈ AI ਸਹਾਇਤਾ',
    online: 'AI ਸਹਾਇਤਾ ਕੇਂਦਰ ਆਨਲਾਈਨ',

    trusted: 'ਭਰੋਸੇਯੋਗ ਸਹਿਕਾਰੀ ਮਾਰਗਦਰਸ਼ਨ',
    welcome: 'ਅੱਜ ਅਸੀਂ ਤੁਹਾਡੀ ਕਿਵੇਂ ਮਦਦ ਕਰ ਸਕਦੇ ਹਾਂ?',
    tagline: 'ਆਪਣੇ ਸਹਿਕਾਰੀ ਸਵਾਲਾਂ ਨੂੰ ਆਸਾਨ ਬਣਾਓ।',
    welcomeCopy:
      'ਚੋਣਾਂ, ਮੈਂਬਰ ਅਧਿਕਾਰਾਂ, ਰਜਿਸਟ੍ਰੇਸ਼ਨ ਅਤੇ ਸ਼ਿਕਾਇਤਾਂ ਬਾਰੇ ਸਪਸ਼ਟ ਅਤੇ ਸਰੋਤ-ਅਧਾਰਿਤ ਮਾਰਗਦਰਸ਼ਨ ਪ੍ਰਾਪਤ ਕਰੋ।',

    sourceBacked: 'ਸਰੋਤ-ਅਧਾਰਿਤ ਜਵਾਬ',
    guided: 'ਮਾਰਗਦਰਸ਼ਿਤ ਪ੍ਰਕਿਰਿਆਵਾਂ',
    multilingual: 'ਬਹੁਭਾਸ਼ੀ ਸਹਾਇਤਾ',

    election: 'ਚੋਣ ਅਤੇ ਵੋਟਿੰਗ',
    electionDesc: 'ਵੋਟ ਦੇ ਅਧਿਕਾਰ ਅਤੇ ਚੋਣ ਪ੍ਰਕਿਰਿਆ ਸਮਝੋ',
    electionQuestion: 'ਕੀ ਮੈਂ ਸਹਿਕਾਰੀ ਚੋਣ ਵਿੱਚ ਵੋਟ ਪਾ ਸਕਦਾ ਹਾਂ?',

    memberRights: 'ਮੈਂਬਰ ਅਧਿਕਾਰ',
    memberRightsDesc: 'ਸਹਿਕਾਰੀ ਮੈਂਬਰ ਵਜੋਂ ਆਪਣੇ ਅਧਿਕਾਰ ਜਾਣੋ',
    memberRightsQuestion: 'ਮੈਂਬਰ ਵਜੋਂ ਮੇਰੇ ਕਾਨੂੰਨੀ ਅਧਿਕਾਰ ਕੀ ਹਨ?',

    grievance: 'ਸ਼ਿਕਾਇਤ ਦਰਜ ਕਰੋ',
    grievanceDesc: 'ਸ਼ਿਕਾਇਤ ਪ੍ਰਕਿਰਿਆ ਵਿੱਚ ਮਾਰਗਦਰਸ਼ਨ ਪ੍ਰਾਪਤ ਕਰੋ',
    grievanceQuestion: 'ਮੈਂ ਸ਼ਿਕਾਇਤ ਕਿਵੇਂ ਦਰਜ ਕਰਾਂ?',

    register: 'ਸਹਿਕਾਰੀ ਰਜਿਸਟਰ ਕਰੋ',
    registerDesc: 'ਸਹਿਕਾਰੀ ਰਜਿਸਟ੍ਰੇਸ਼ਨ ਦੇ ਕਦਮ ਜਾਣੋ',
    registerQuestion: 'ਮੈਂ ਸਹਿਕਾਰੀ ਸੰਸਥਾ ਨੂੰ ਕਿਵੇਂ ਰਜਿਸਟਰ ਕਰਾਂ?',

    governanceAgent: 'ਪ੍ਰਸ਼ਾਸਨ ਏਜੰਟ',
    legalAgent: 'ਕਾਨੂੰਨੀ ਏਜੰਟ',
    grievanceAgent: 'ਸ਼ਿਕਾਇਤ ਏਜੰਟ',

    sources: 'ਸਰੋਤ',
    page: 'ਪੰਨਾ',

    preparing: 'ਤੁਹਾਡਾ ਜਵਾਬ ਤਿਆਰ ਕੀਤਾ ਜਾ ਰਿਹਾ ਹੈ...',
    searching: 'ਸਹਿਕਾਰੀ ਜਾਣਕਾਰੀ ਲੱਭੀ ਜਾ ਰਹੀ ਹੈ...',

    errorTitle: 'ਕੁਝ ਗਲਤ ਹੋ ਗਿਆ।',
    dismiss: 'ਬੰਦ ਕਰੋ',
    connectionError: 'ਬੈਕਐਂਡ ਨਾਲ ਕਨੈਕਟ ਨਹੀਂ ਹੋ ਸਕਿਆ।',

    guidedProcedure: 'ਮਾਰਗਦਰਸ਼ਿਤ ਪ੍ਰਕਿਰਿਆ',
    procedureComplete: 'ਮਾਰਗਦਰਸ਼ਿਤ ਪ੍ਰਕਿਰਿਆ ਪੂਰੀ',
    grievanceReady: 'ਸ਼ਿਕਾਇਤ ਜਮ੍ਹਾਂ ਕਰਨ ਲਈ ਤਿਆਰ ਹੈ',
    mockCollected:
      'ਇਸ ਡੈਮੋ ਪ੍ਰਕਿਰਿਆ ਵਿੱਚ ਤੁਹਾਡੇ ਵੇਰਵੇ ਇਕੱਠੇ ਕੀਤੇ ਗਏ ਹਨ। ਕੋਈ ਸ਼ਿਕਾਇਤ ਜਮ੍ਹਾਂ ਨਹੀਂ ਕੀਤੀ ਗਈ।',
    close: 'ਬੰਦ ਕਰੋ',

    step: 'ਕਦਮ',
    of: 'ਵਿੱਚੋਂ',

    grievanceAbout: 'ਤੁਹਾਡੀ ਸ਼ਿਕਾਇਤ ਕਿਸ ਬਾਰੇ ਹੈ?',
    describeIssue: 'ਸਮੱਸਿਆ ਦਾ ਵੇਰਵਾ ਦਿਓ',
    describeHint: 'ਕੀ ਹੋਇਆ ਅਤੇ ਕਦੋਂ ਹੋਇਆ, ਸੰਖੇਪ ਵਿੱਚ ਦੱਸੋ।',
    supportingDocuments: 'ਸਹਾਇਕ ਦਸਤਾਵੇਜ਼',
    reviewSubmit: 'ਸਮੀਖਿਆ ਅਤੇ ਜਮ੍ਹਾਂ ਕਰੋ',
    reviewHint:
      'ਸ਼ਿਕਾਇਤ ਜਮ੍ਹਾਂ ਕਰਨ ਤੋਂ ਪਹਿਲਾਂ ਆਪਣੇ ਵੇਰਵਿਆਂ ਦੀ ਸਮੀਖਿਆ ਕਰੋ।',

    electionOption: 'ਚੋਣ',
    managementOption: 'ਪ੍ਰਬੰਧਨ',
    membershipOption: 'ਮੈਂਬਰਸ਼ਿਪ',
    otherOption: 'ਹੋਰ',

    haveDocuments: 'ਮੇਰੇ ਕੋਲ ਜੋੜਨ ਲਈ ਦਸਤਾਵੇਜ਼ ਹਨ',
    noDocuments: 'ਮੇਰੇ ਕੋਲ ਦਸਤਾਵੇਜ਼ ਨਹੀਂ ਹਨ',

    describePlaceholder: 'ਆਪਣੀ ਸ਼ਿਕਾਇਤ ਦਾ ਵੇਰਵਾ ਦਿਓ...',
    readyReview: 'ਤੁਹਾਡੀ ਸ਼ਿਕਾਇਤ ਦੇ ਵੇਰਵੇ ਸਮੀਖਿਆ ਲਈ ਤਿਆਰ ਹਨ।',
    mockPreview: 'ਇਹ ਸਿਰਫ਼ ਇੱਕ ਡੈਮੋ ਝਲਕ ਹੈ।',

    back: 'ਪਿੱਛੇ',
    cancel: 'ਰੱਦ ਕਰੋ',
    next: 'ਅੱਗੇ',
    submit: 'ਜਮ੍ਹਾਂ ਕਰੋ',

    inputPlaceholder:
      'ਚੋਣਾਂ, ਅਧਿਕਾਰਾਂ, ਰਜਿਸਟ੍ਰੇਸ਼ਨ ਜਾਂ ਸ਼ਿਕਾਇਤਾਂ ਬਾਰੇ ਪੁੱਛੋ...',
    inputLabel: 'ਆਪਣਾ ਸਹਿਕਾਰੀ ਜਾਂ ਕਾਨੂੰਨੀ ਸਵਾਲ ਲਿਖੋ',
    send: 'ਭੇਜੋ',
    chooseLanguage: 'ਭਾਸ਼ਾ ਚੁਣੋ',

    disclaimer:
      'ਸਿਰਫ਼ ਆਮ ਮਾਰਗਦਰਸ਼ਨ ਲਈ। ਕਾਨੂੰਨੀ ਸਲਾਹ ਲਈ ਯੋਗ ਪੇਸ਼ੇਵਰ ਨਾਲ ਸਲਾਹ ਕਰੋ।',

    you: 'ਤੁਸੀਂ',
    helpdesk: 'ਸਹਿਕਾਰੀ ਸਹਾਇਤਾ ਕੇਂਦਰ',
  },

  ml: {
    title: 'സഹകരണ നിയമ സഹായ കേന്ദ്രം',
    subtitle: 'സഹകരണ അംഗങ്ങൾക്കായുള്ള AI സഹായം',
    online: 'AI സഹായ കേന്ദ്രം ഓൺലൈനിലാണ്',

    trusted: 'വിശ്വസനീയമായ സഹകരണ മാർഗനിർദ്ദേശം',
    welcome: 'ഇന്ന് ഞങ്ങൾക്ക് നിങ്ങളെ എങ്ങനെ സഹായിക്കാം?',
    tagline: 'നിങ്ങളുടെ സഹകരണ ചോദ്യങ്ങൾ ലളിതമാക്കുക.',
    welcomeCopy:
      'തിരഞ്ഞെടുപ്പ്, അംഗങ്ങളുടെ അവകാശങ്ങൾ, രജിസ്ട്രേഷൻ, പരാതികൾ എന്നിവയെക്കുറിച്ച് വ്യക്തമായ മാർഗനിർദ്ദേശം നേടുക.',

    sourceBacked: 'ഉറവിട അധിഷ്ഠിത ഉത്തരങ്ങൾ',
    guided: 'മാർഗനിർദ്ദേശിത നടപടികൾ',
    multilingual: 'ബഹുഭാഷാ പിന്തുണ',

    election: 'തിരഞ്ഞെടുപ്പും വോട്ടിംഗും',
    electionDesc: 'വോട്ടിംഗ് അവകാശങ്ങളും തിരഞ്ഞെടുപ്പ് നടപടികളും മനസ്സിലാക്കുക',
    electionQuestion: 'എനിക്ക് സഹകരണ തിരഞ്ഞെടുപ്പിൽ വോട്ട് ചെയ്യാമോ?',

    memberRights: 'അംഗങ്ങളുടെ അവകാശങ്ങൾ',
    memberRightsDesc: 'സഹകരണ അംഗമെന്ന നിലയിൽ നിങ്ങളുടെ അവകാശങ്ങൾ അറിയുക',
    memberRightsQuestion: 'അംഗമെന്ന നിലയിൽ എന്റെ നിയമപരമായ അവകാശങ്ങൾ എന്തൊക്കെയാണ്?',

    grievance: 'പരാതി സമർപ്പിക്കുക',
    grievanceDesc: 'പരാതി നടപടിക്രമത്തിൽ മാർഗനിർദ്ദേശം നേടുക',
    grievanceQuestion: 'ഞാൻ എങ്ങനെ പരാതി സമർപ്പിക്കും?',

    register: 'സഹകരണ സ്ഥാപനം രജിസ്റ്റർ ചെയ്യുക',
    registerDesc: 'സഹകരണ രജിസ്ട്രേഷന്റെ ഘട്ടങ്ങൾ അറിയുക',
    registerQuestion: 'ഞാൻ എങ്ങനെ ഒരു സഹകരണ സ്ഥാപനം രജിസ്റ്റർ ചെയ്യും?',

    governanceAgent: 'ഭരണ ഏജന്റ്',
    legalAgent: 'നിയമ ഏജന്റ്',
    grievanceAgent: 'പരാതി ഏജന്റ്',

    sources: 'ഉറവിടങ്ങൾ',
    page: 'പേജ്',

    preparing: 'നിങ്ങളുടെ ഉത്തരം തയ്യാറാക്കുന്നു...',
    searching: 'സഹകരണ വിവരങ്ങൾ തിരയുന്നു...',

    errorTitle: 'എന്തോ തെറ്റ് സംഭവിച്ചു.',
    dismiss: 'അടയ്ക്കുക',
    connectionError: 'ബാക്കെൻഡുമായി ബന്ധിപ്പിക്കാൻ കഴിഞ്ഞില്ല.',

    guidedProcedure: 'മാർഗനിർദ്ദേശിത നടപടിക്രമം',
    procedureComplete: 'മാർഗനിർദ്ദേശിത നടപടിക്രമം പൂർത്തിയായി',
    grievanceReady: 'പരാതി സമർപ്പിക്കാൻ തയ്യാറാണ്',
    mockCollected:
      'ഈ ഡെമോ നടപടിക്രമത്തിൽ നിങ്ങളുടെ വിവരങ്ങൾ ശേഖരിച്ചു. പരാതി സമർപ്പിച്ചിട്ടില്ല.',
    close: 'അടയ്ക്കുക',

    step: 'ഘട്ടം',
    of: 'ൽ',

    grievanceAbout: 'നിങ്ങളുടെ പരാതി എന്തിനെക്കുറിച്ചാണ്?',
    describeIssue: 'പ്രശ്നം വിവരിക്കുക',
    describeHint: 'എന്ത് സംഭവിച്ചു, എപ്പോൾ സംഭവിച്ചു എന്ന് ചുരുക്കമായി പറയുക.',
    supportingDocuments: 'അനുബന്ധ രേഖകൾ',
    reviewSubmit: 'പരിശോധിച്ച് സമർപ്പിക്കുക',
    reviewHint:
      'പരാതി തയ്യാറാക്കുന്നതിന് മുമ്പ് നിങ്ങളുടെ വിവരങ്ങൾ പരിശോധിക്കുക.',

    electionOption: 'തിരഞ്ഞെടുപ്പ്',
    managementOption: 'മാനേജ്മെന്റ്',
    membershipOption: 'അംഗത്വം',
    otherOption: 'മറ്റുള്ളവ',

    haveDocuments: 'എനിക്ക് ചേർക്കാനുള്ള രേഖകൾ ഉണ്ട്',
    noDocuments: 'എന്റെ കൈയിൽ രേഖകളില്ല',

    describePlaceholder: 'നിങ്ങളുടെ പരാതി വിവരിക്കുക...',
    readyReview: 'നിങ്ങളുടെ പരാതി വിവരങ്ങൾ പരിശോധനയ്ക്ക് തയ്യാറാണ്.',
    mockPreview: 'ഇത് ഒരു ഡെമോ പ്രിവ്യൂ മാത്രമാണ്.',

    back: 'പിന്നിലേക്ക്',
    cancel: 'റദ്ദാക്കുക',
    next: 'അടുത്തത്',
    submit: 'സമർപ്പിക്കുക',

    inputPlaceholder:
      'തിരഞ്ഞെടുപ്പ്, അവകാശങ്ങൾ, രജിസ്ട്രേഷൻ അല്ലെങ്കിൽ പരാതികൾ ചോദിക്കുക...',
    inputLabel: 'നിങ്ങളുടെ സഹകരണ അല്ലെങ്കിൽ നിയമ ചോദ്യം ടൈപ്പ് ചെയ്യുക',
    send: 'അയയ്ക്കുക',
    chooseLanguage: 'ഭാഷ തിരഞ്ഞെടുക്കുക',

    disclaimer:
      'പൊതുവായ മാർഗനിർദ്ദേശത്തിനായി മാത്രം. നിയമോപദേശത്തിനായി യോഗ്യതയുള്ള പ്രൊഫഷണലിനെ സമീപിക്കുക.',

    you: 'നിങ്ങൾ',
    helpdesk: 'സഹകരണ സഹായ കേന്ദ്രം',
  },
}

/* =========================================================
   LANGUAGE NAMES
   ========================================================= */

const languageNames = {
  en: 'English',
  hi: 'हिन्दी (Hindi)',
  mr: 'मराठी (Marathi)',
  bn: 'বাংলা (Bengali)',
  ta: 'தமிழ் (Tamil)',
  te: 'తెలుగు (Telugu)',
  kn: 'ಕನ್ನಡ (Kannada)',
  gu: 'ગુજરાતી (Gujarati)',
  pa: 'ਪੰਜਾਬੀ (Punjabi)',
  ml: 'മലയാളം (Malayalam)',
}

/* =========================================================
   QUICK ACTIONS
   ========================================================= */

const getQuickActions = (t) => [
  {
    icon: '\u{1F5F3}',
    title: t.election,
    description: t.electionDesc,
    question: t.electionQuestion,
    tone: 'saffron',
  },
  {
    icon: '\u2696',
    title: t.memberRights,
    description: t.memberRightsDesc,
    question: t.memberRightsQuestion,
    tone: 'violet',
  },
  {
    icon: '\u{1F4CB}',
    title: t.grievance,
    description: t.grievanceDesc,
    question: t.grievanceQuestion,
    tone: 'teal',
  },
  {
    icon: '\u{1F3E2}',
    title: t.register,
    description: t.registerDesc,
    question: t.registerQuestion,
    tone: 'blue',
  },
]

/* =========================================================
   AGENT DETAILS
   ========================================================= */

const getAgentDetails = (t) => ({
  governance: {
    icon: '\u{1F3DB}',
    name: t.governanceAgent,
  },
  legal: {
    icon: '\u2696',
    name: t.legalAgent,
  },
  grievance: {
    icon: '\u{1F4CB}',
    name: t.grievanceAgent,
  },
})

/* =========================================================
   SOURCE CARD
   ========================================================= */

function SourceCard({ source, t }) {
  return (
    <article className="source-card">
      <span className="source-file" aria-hidden="true">
        {'\u{1F4C4}'}
      </span>

      <div>
        <p className="source-document">{source.doc}</p>
        <p className="source-section">{source.section}</p>
        <span className="source-page">
          {t.page} {source.page}
        </span>
      </div>
    </article>
  )
}

/* =========================================================
   ASSISTANT RESPONSE
   ========================================================= */

function AssistantResponse({ response, messageId, t }) {
  const [sourcesVisible, setSourcesVisible] = useState(true)

  const agentDetails = getAgentDetails(t)

  const agent =
    agentDetails[response.route] || agentDetails.legal

  const sourcesId = `sources-${messageId}`

  return (
    <div className="assistant-response">
      <p className="message-label">{t.helpdesk}</p>

      <span className={`route-badge route-${response.route}`}>
        {agent.icon} {agent.name}
      </span>

      <p className="message-bubble">{response.reply}</p>

      {response.sources?.length > 0 && (
        <section
          className="sources"
          aria-label={t.sources}
        >
          <button
            className="sources-toggle"
            type="button"
            onClick={() =>
              setSourcesVisible((value) => !value)
            }
            aria-expanded={sourcesVisible}
            aria-controls={sourcesId}
          >
            <span>
              {'\u{1F4DA}'} {t.sources} ({response.sources.length})
            </span>

            <span aria-hidden="true">
              {sourcesVisible ? '−' : '+'}
            </span>
          </button>

          {sourcesVisible && (
            <div
              className="source-list"
              id={sourcesId}
            >
              {response.sources.map((source) => (
                <SourceCard
                  key={`${source.doc}-${source.page}`}
                  source={source}
                  t={t}
                />
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  )
}

/* =========================================================
   LOADING
   ========================================================= */

function LoadingIndicator({ stage, t }) {
  const text =
    stage === 'preparing'
      ? `\u{1F916} ${t.preparing}`
      : `\u{1F50D} ${t.searching}`

  return (
    <div
      className="loading-indicator"
      role="status"
      aria-live="polite"
    >
      <span className="loading-orb">
        <i />
        <i />
        <i />
      </span>

      <span>{text}</span>
    </div>
  )
}

/* =========================================================
   ERROR
   ========================================================= */

function ErrorMessage({ message, onDismiss, t }) {
  return (
    <div
      className="error-message"
      role="alert"
    >
      <span
        className="error-icon"
        aria-hidden="true"
      >
        {'\u26A0'}
      </span>

      <p>
        <strong>{t.errorTitle}</strong>

        {message && (
          <span>{message}</span>
        )}
      </p>

      <button
        type="button"
        onClick={onDismiss}
        aria-label={t.dismiss}
      >
        {t.dismiss}
      </button>
    </div>
  )
}

/* =========================================================
   GRIEVANCE FLOW
   ========================================================= */

function getGrievanceFlow(t) {
  return {
    title: t.grievance,
    subtitle: t.guidedProcedure,

    steps: [
      {
        title: t.grievanceAbout,
        options: [
          t.electionOption,
          t.managementOption,
          t.membershipOption,
          t.otherOption,
        ],
      },

      {
        title: t.describeIssue,
        description: t.describeHint,
      },

      {
        title: t.supportingDocuments,
        options: [
          t.haveDocuments,
          t.noDocuments,
        ],
      },

      {
        title: t.reviewSubmit,
        description: t.reviewHint,
      },
    ],
  }
}

/* =========================================================
   GUIDED PROCEDURE
   ========================================================= */

function GuidedProcedure({ flow, onCancel, t }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [isReady, setIsReady] = useState(false)

  const step = flow.steps[currentStep]

  const isLastStep =
    currentStep === flow.steps.length - 1

  const canContinue = step.options
    ? Boolean(answers[currentStep])
    : currentStep !== 1 ||
      Boolean(answers[currentStep]?.trim())

  if (isReady) {
    return (
      <aside
        className="guided-procedure completion-state"
        aria-label={t.procedureComplete}
      >
        <div
          className="procedure-icon success"
          aria-hidden="true"
        >
          {'\u2713'}
        </div>

        <p className="procedure-kicker">
          {t.procedureComplete}
        </p>

        <h2>{t.grievanceReady}</h2>

        <p>{t.mockCollected}</p>

        <button
          className="secondary-action"
          type="button"
          onClick={onCancel}
        >
          {t.close}
        </button>
      </aside>
    )
  }

  const nextStep = () => {
    if (isLastStep) {
      setIsReady(true)
    } else {
      setCurrentStep((value) => value + 1)
    }
  }

  return (
    <aside
      className="guided-procedure"
      aria-label={flow.title}
    >
      <header className="procedure-header">
        <div
          className="procedure-icon"
          aria-hidden="true"
        >
          {'\u{1F4CB}'}
        </div>

        <div>
          <p className="procedure-kicker">
            {t.guidedProcedure}
          </p>

          <h2>{flow.title}</h2>

          <span>{flow.subtitle}</span>
        </div>
      </header>

      <div className="procedure-progress">
        <div className="step-count">
          {t.step}{' '}
          <strong>{currentStep + 1}</strong>{' '}
          {t.of} {flow.steps.length}
        </div>

        <div
          className="progress-dots"
          aria-label={`${t.step} ${currentStep + 1} ${t.of} ${flow.steps.length}`}
        >
          {flow.steps.map((flowStep, index) => (
            <span
              className={
                index <= currentStep
                  ? 'active'
                  : ''
              }
              key={flowStep.title}
            />
          ))}
        </div>
      </div>

      <section className="procedure-content">
        <h3>{step.title}</h3>

        {step.description && (
          <p>{step.description}</p>
        )}

        {step.options && (
          <div className="quick-replies">
            {step.options.map((option) => (
              <button
                className={
                  answers[currentStep] === option
                    ? 'selected'
                    : ''
                }
                type="button"
                key={option}
                onClick={() =>
                  setAnswers((value) => ({
                    ...value,
                    [currentStep]: option,
                  }))
                }
                aria-pressed={
                  answers[currentStep] === option
                }
              >
                {option}
              </button>
            ))}
          </div>
        )}

        {currentStep === 1 && (
          <textarea
            aria-label={t.describeIssue}
            placeholder={t.describePlaceholder}
            value={answers[currentStep] || ''}
            onChange={(event) =>
              setAnswers((value) => ({
                ...value,
                [currentStep]: event.target.value,
              }))
            }
          />
        )}

        {currentStep === 3 && (
          <div className="review-summary">
            {'\u2713'} {t.readyReview}{' '}
            {t.mockPreview}
          </div>
        )}
      </section>

      <footer className="procedure-actions">
        <div>
          {currentStep > 0 && (
            <button
              className="text-action"
              type="button"
              onClick={() =>
                setCurrentStep((value) => value - 1)
              }
            >
              ← {t.back}
            </button>
          )}
        </div>

        <div>
          <button
            className="text-action"
            type="button"
            onClick={onCancel}
          >
            {t.cancel}
          </button>

          <button
            className="primary-action"
            type="button"
            onClick={nextStep}
            disabled={!canContinue}
          >
            {isLastStep
              ? t.submit
              : `${t.next} →`}
          </button>
        </div>
      </footer>
    </aside>
  )
}

/* =========================================================
   MAIN APP
   ========================================================= */

function App() {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [activeFlow, setActiveFlow] = useState(null)
  const [loadingStage, setLoadingStage] = useState(null)
  const [error, setError] = useState(null)

  // Default language = English
  const [language, setLanguage] = useState('en')

  const [sessionId] = useState(
    () => `web-${crypto.randomUUID()}`
  )

  const t =
    translations[language] || translations.en

  const quickActions = getQuickActions(t)

  /* =======================================================
     SEND MESSAGE
     ======================================================= */

  const sendMessage = async (text) => {
    const trimmedMessage = text.trim()

    if (!trimmedMessage || loadingStage) {
      return
    }

    setError(null)

    setMessages((current) => [
      ...current,
      {
        sender: 'user',
        text: trimmedMessage,
      },
    ])

    setLoadingStage('searching')
    setMessage('')

    try {
      const response = await fetch(
        'http://localhost:8000/chat',
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify({
            session_id: sessionId,
            message: trimmedMessage,

            // Send selected language directly
            // to FastAPI backend
            language: language,
          }),
        }
      )

      if (!response.ok) {
        let errorMessage =
          t.connectionError

        try {
          const errorData =
            await response.json()

          errorMessage =
            errorData.detail ||
            errorMessage
        } catch {
          // Keep default error message
        }

        throw new Error(errorMessage)
      }

      setLoadingStage('preparing')

      const data = await response.json()

      setMessages((current) => [
        ...current,
        {
          sender: 'assistant',
          response: {
            ...data,
            sources: data.sources || [],
          },
        },
      ])
    } catch (requestError) {
      setError(
        requestError.message ||
          t.connectionError
      )
    } finally {
      setLoadingStage(null)
    }
  }

  /* =======================================================
     RENDER
     ======================================================= */

  return (
    <main className="app-shell">
      <div className="ambient-shape shape-one" />
      <div className="ambient-shape shape-two" />

      <section
        className="helpdesk"
        aria-label={t.title}
      >
        {/* =================================================
            HEADER
        ================================================= */}

        <header className="app-header">
          <div className="brand">
            <div
              className="brand-mark"
              aria-hidden="true"
            >
              {'\u{1F3DB}'}
            </div>

            <div>
              <h1>{t.title}</h1>

              <p>{t.subtitle}</p>

              <span className="online-status">
                <i /> {t.online}
              </span>
            </div>
          </div>

          {/* LANGUAGE DROPDOWN */}

          <label className="language-select">
            <span className="sr-only">
              {t.chooseLanguage}
            </span>

            <span aria-hidden="true">
              {'\u{1F310}'}
            </span>

            <select
              value={language}
              onChange={(event) => {
                setLanguage(event.target.value)
              }}
              aria-label={t.chooseLanguage}
            >
              {Object.entries(languageNames).map(
                ([code, name]) => (
                  <option
                    key={code}
                    value={code}
                  >
                    {name}
                  </option>
                )
              )}
            </select>
          </label>
        </header>

        {/* =================================================
            CHAT AREA
        ================================================= */}

        <div
          className={`chat-area ${
            messages.length
              ? 'has-messages'
              : ''
          }`}
        >
          {/* =================================================
              WELCOME SCREEN
          ================================================= */}

          {messages.length === 0 ? (
            <div className="welcome-screen">
              <div className="hero-badge">
                {'\u2726'} {t.trusted}
              </div>

              <h2>{t.welcome}</h2>

              <p className="welcome-tagline">
                {t.tagline}
              </p>

              <p className="welcome-copy">
                {t.welcomeCopy}
              </p>

              <div className="trust-row">
                <span>
                  {'\u2713'} {t.sourceBacked}
                </span>

                <span>
                  {'\u2713'} {t.guided}
                </span>

                <span>
                  {'\u2713'} {t.multilingual}
                </span>
              </div>

              {/* QUICK ACTIONS */}

              <div
                className="suggestions"
                aria-label={t.guided}
              >
                {quickActions.map(
                  (action) => (
                    <button
                      className={`action-card ${action.tone}`}
                      key={action.title}
                      type="button"
                      onClick={() =>
                        sendMessage(
                          action.question
                        )
                      }
                      disabled={Boolean(
                        loadingStage
                      )}
                      aria-label={`${action.title}: ${action.description}`}
                    >
                      <span
                        className="action-icon"
                        aria-hidden="true"
                      >
                        {action.icon}
                      </span>

                      <span>
                        <strong>
                          {action.title}
                        </strong>

                        <small>
                          {action.description}
                        </small>
                      </span>

                      <span
                        className="action-arrow"
                        aria-hidden="true"
                      >
                        →
                      </span>
                    </button>
                  )
                )}
              </div>
            </div>
          ) : (
            /* =================================================
               MESSAGES
            ================================================= */

            <div
              className="messages"
              aria-live="polite"
            >
              {messages.map(
                (chatMessage, index) => (
                  <article
                    className={`message ${chatMessage.sender}`}
                    key={`${chatMessage.sender}-${index}`}
                  >
                    {chatMessage.sender ===
                      'assistant' && (
                      <div
                        className="message-avatar"
                        aria-hidden="true"
                      >
                        {'\u{1F3DB}'}
                      </div>
                    )}

                    <div>
                      {chatMessage.sender ===
                      'assistant' ? (
                        <AssistantResponse
                          response={
                            chatMessage.response
                          }
                          messageId={index}
                          t={t}
                        />
                      ) : (
                        <>
                          <p className="message-label">
                            {t.you}
                          </p>

                          <p className="message-bubble">
                            {chatMessage.text}
                          </p>
                        </>
                      )}
                    </div>
                  </article>
                )
              )}

              {/* LOADING */}

              {loadingStage && (
                <LoadingIndicator
                  stage={loadingStage}
                  t={t}
                />
              )}

              {/* ERROR */}

              {error && (
                <ErrorMessage
                  message={error}
                  onDismiss={() =>
                    setError(null)
                  }
                  t={t}
                />
              )}
            </div>
          )}
        </div>

        {/* =================================================
            GUIDED GRIEVANCE PROCEDURE
        ================================================= */}

        {activeFlow && (
          <div className="procedure-region">
            <GuidedProcedure
              flow={activeFlow}
              onCancel={() =>
                setActiveFlow(null)
              }
              t={t}
            />
          </div>
        )}

        {/* =================================================
            CHAT COMPOSER
        ================================================= */}

        <form
          className="chat-composer"
          onSubmit={(event) => {
            event.preventDefault()
            sendMessage(message)
          }}
        >
          <label
            className="sr-only"
            htmlFor="chat-message"
          >
            {t.inputLabel}
          </label>

          <input
            id="chat-message"
            value={message}
            onChange={(event) =>
              setMessage(event.target.value)
            }
            placeholder={t.inputPlaceholder}
            autoComplete="off"
            aria-label={t.inputLabel}
            disabled={Boolean(
              loadingStage
            )}
          />

          <button
            type="submit"
            disabled={
              !message.trim() ||
              Boolean(loadingStage)
            }
            aria-label={t.send}
          >
            {t.send}{' '}
            <span aria-hidden="true">
              ↑
            </span>
          </button>
        </form>

        {/* =================================================
            DISCLAIMER
        ================================================= */}

        <p className="disclaimer">
          {t.disclaimer}
        </p>
      </section>
    </main>
  )
}

export default App