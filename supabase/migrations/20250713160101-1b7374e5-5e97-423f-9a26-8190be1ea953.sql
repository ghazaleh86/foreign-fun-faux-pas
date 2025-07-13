
-- Comprehensive pronunciation standardization for all languages
-- Convert English approximations to proper native phonetic systems

-- Arabic: Update to proper Arabic phonetic transcription
UPDATE phrases SET pronunciation = 'ʕayn baṣīra wa-l-yad qaṣīra' WHERE phrase_text = 'العين بصيرة واليد قصيرة';
UPDATE phrases SET pronunciation = 'ʕayš wa-milḥ' WHERE phrase_text = 'عيش و ملح';
UPDATE phrases SET pronunciation = 'al-ṣabr miftāḥ al-faraj' WHERE phrase_text = 'الصبر مفتاح الفرج';
UPDATE phrases SET pronunciation = 'man ṭalab al-ʕulā sahar al-layālī' WHERE phrase_text = 'من طلب العُلا سهر الليالي';
UPDATE phrases SET pronunciation = 'al-ʕajala min al-šayṭān' WHERE phrase_text = 'العجلة من الشيطان';

-- Japanese: Update to proper Rōmaji
UPDATE phrases SET pronunciation = 'ki wo mite mori wo mizu' WHERE phrase_text = '木を見て森を見ず';
UPDATE phrases SET pronunciation = 'nana korobi ya oki' WHERE phrase_text = '七転び八起き';
UPDATE phrases SET pronunciation = 'neko ni koban' WHERE phrase_text = '猫に小判';
UPDATE phrases SET pronunciation = 'saru mo ki kara ochiru' WHERE phrase_text = '猿も木から落ちる';
UPDATE phrases SET pronunciation = 'ame futte ji katamaru' WHERE phrase_text = '雨降って地固まる';

-- Korean: Update to Revised Romanization of Korean
UPDATE phrases SET pronunciation = 'gae-ga ul-myeon bi-ga on-da' WHERE phrase_text = '개가 울면 비가 온다';
UPDATE phrases SET pronunciation = 'ho-rang-i-do je mal-ha-myeon on-da' WHERE phrase_text = '호랑이도 제 말하면 온다';
UPDATE phrases SET pronunciation = 'baem-i mu-seo-wo-seo gil-eul geot-ji mot-han-da' WHERE phrase_text = '뱀이 무서워서 길을 걷지 못한다';
UPDATE phrases SET pronunciation = 'nun-chi-ga eop-da' WHERE phrase_text = '눈치가 없다';
UPDATE phrases SET pronunciation = 'mok-ma-reul ttae u-mul-eul pa-ya han-da' WHERE phrase_text = '목마를 때 우물을 파야 한다';

-- Thai: Update to Royal Thai General System
UPDATE phrases SET pronunciation = 'mɯ̄a kìi lɯ̄an krɯ̂aŋ' WHERE phrase_text = 'เมื่อขี้เหลือเครื่อง';
UPDATE phrases SET pronunciation = 'sɯ̄a tāai nǎŋ lāai' WHERE phrase_text = 'เสือตายเนื้อเลือด';
UPDATE phrases SET pronunciation = 'nɔ́ɔk krà-chāa dīi tàae tua' WHERE phrase_text = 'นกกระจาบดีแต่ตัว';
UPDATE phrases SET pronunciation = 'mɛ̄w mâi yùu krɯ̄aŋ kəəi rɯ̄ak' WHERE phrase_text = 'แมวไม่อยู่เครื่องเข้าเรียก';
UPDATE phrases SET pronunciation = 'plaa yài kin plaa lék' WHERE phrase_text = 'ปลาใหญ่กินปลาเล็ก';

-- Vietnamese: Update with proper tone marks
UPDATE phrases SET pronunciation = 'cây ngay không sợ chết đứng' WHERE phrase_text = 'Cây ngay không sợ chết đứng';
UPDATE phrases SET pronunciation = 'có công mài sắt có ngày nên kim' WHERE phrase_text = 'Có công mài sắt có ngày nên kim';
UPDATE phrases SET pronunciation = 'gần mực thì đen, gần đèn thì sáng' WHERE phrase_text = 'Gần mực thì đen, gần đèn thì sáng';
UPDATE phrases SET pronunciation = 'lá lành đùm lá rách' WHERE phrase_text = 'Lá lành đùm lá rách';
UPDATE phrases SET pronunciation = 'một cây làm chẳng nên non, ba cây chụm lại nên hòn núi cao' WHERE phrase_text = 'Một cây làm chẳng nên non, ba cây chụm lại nên hòn núi cao';

-- Russian: Update to proper Cyrillic phonetic transcription
UPDATE phrases SET pronunciation = 'na bógu nadéyas', a sam ne ploshái' WHERE phrase_text = 'На бога надейся, а сам не плошай';
UPDATE phrases SET pronunciation = 'bez trudá ne výtaščiš i rýbku iz prudá' WHERE phrase_text = 'Без труда не вытащишь и рыбку из пруда';
UPDATE phrases SET pronunciation = 'gdé tónko, tam i rǝ́vetsya' WHERE phrase_text = 'Где тонко, там и рвётся';
UPDATE phrases SET pronunciation = 'kto ráno vstajót, tomú bog dajót' WHERE phrase_text = 'Кто рано встаёт, тому бог даёт';
UPDATE phrases SET pronunciation = 'golód ne tjótka' WHERE phrase_text = 'Голод не тётка';

-- German: Update to proper German phonetic notation
UPDATE phrases SET pronunciation = 'daː ˈʃlaːkən diː ˈʃtʊndən' WHERE phrase_text = 'Da schlagen die Stunden';
UPDATE phrases SET pronunciation = 'ˈaləs ˈhaːt aɪn ˈɛndə nuːɐ̯ diː ˈvʊɐ̯st haːt ˈtsvaɪ' WHERE phrase_text = 'Alles hat ein Ende, nur die Wurst hat zwei';
UPDATE phrases SET pronunciation = 'ˈaləs ˈfyːɐ̯ diː ˈkats' WHERE phrase_text = 'Alles für die Katz';
UPDATE phrases SET pronunciation = 'ˈaləs ɪn ˈbʊtɐ' WHERE phrase_text = 'Alles in Butter';
UPDATE phrases SET pronunciation = 'ˈaləs ˈhaːt zaɪnə ˈtsaɪt' WHERE phrase_text = 'Alles hat seine Zeit';

-- French: Update to proper French phonetic notation
UPDATE phrases SET pronunciation = 'il o ʁã.vɛʁ.se la va.pœʁ' WHERE phrase_text = 'Il a renversé la vapeur';
UPDATE phrases SET pronunciation = 'il a le kœʁ syʁ la mɛ̃' WHERE phrase_text = 'Il a le cœur sur la main';
UPDATE phrases SET pronunciation = 'lə ʒø ɑ̃ vo la ʃɑ̃.dɛl' WHERE phrase_text = 'Le jeu en vaut la chandelle';
UPDATE phrases SET pronunciation = 'sɛ la vi' WHERE phrase_text = 'C''est la vie';
UPDATE phrases SET pronunciation = 'mɛ.tʁə la ʃa.ʁy də.vɑ̃ le bœf' WHERE phrase_text = 'Mettre la charrue devant les bœufs';

-- Spanish: Update to proper Spanish phonetic notation
UPDATE phrases SET pronunciation = 'ˈaɣwa ˈke no as ðe ˈβeβeɾ ˈðe.xa.la ˈko.reɾ' WHERE phrase_text = 'Agua que no has de beber, déjala correr';
UPDATE phrases SET pronunciation = 'a ˈkaβa.ʎo ɾe.ɣa.ˈla.ðo no se le ˈmi.ɾa el ˈðjen.te' WHERE phrase_text = 'A caballo regalado no se le mira el diente';
UPDATE phrases SET pronunciation = 'ˈpe.ɾo ˈla.ðɾa ˈmu.ʧo ˈla.ðɾa ˈpo.ko' WHERE phrase_text = 'Perro ladra mucho, ladra poco';
UPDATE phrases SET pronunciation = 'ˈpe.ɾo ˈβje.xo no ˈa.pɾen.ðe ˈtɾu.kos ˈnwe.βos' WHERE phrase_text = 'Perro viejo no aprende trucos nuevos';
UPDATE phrases SET pronunciation = 'no ˈto.ðo lo ˈke ˈβɾi.ʎa es ˈo.ɾo' WHERE phrase_text = 'No todo lo que brilla es oro';

-- Italian: Update to proper Italian phonetic notation
UPDATE phrases SET pronunciation = 'ˈkane ˈke ˈabbaia non ˈmorde' WHERE phrase_text = 'Cane che abbaia non morde';
UPDATE phrases SET pronunciation = 'ˈkjodi ˈskattʃa ˈkjodo' WHERE phrase_text = 'Chiodo scaccia chiodo';
UPDATE phrases SET pronunciation = 'ˈdove ˈcanta il ˈɡallo non ˈkanta la ˈɡallina' WHERE phrase_text = 'Dove canta il gallo non canta la gallina';
UPDATE phrases SET pronunciation = 'ˈɡatta ˈfrettolosa ˈfɛːtʃe i ˈɡattini ˈtʃɛːki' WHERE phrase_text = 'Gatta frettolosa fece i gattini ciechi';
UPDATE phrases SET pronunciation = 'ˈlɛ ˈɛnno ˈɛrba ˈvoʎʎa' WHERE phrase_text = 'Le hanno erba voglia';

-- Portuguese: Update to proper Portuguese phonetic notation
UPDATE phrases SET pronunciation = 'ˈkɐ̃w ˈke ˈlatɾɐ nɐ̃w ˈmoɾde' WHERE phrase_text = 'Cão que ladra não morde';
UPDATE phrases SET pronunciation = 'ˈaɣuɐ ˈmo.le ẽ ˈpe.dɾɐ ˈdu.ɾɐ ˈtɐ̃.tu ˈba.te ˈa.te ˈke ˈfu.ɾɐ' WHERE phrase_text = 'Água mole em pedra dura tanto bate até que fura';
UPDATE phrases SET pronunciation = 'ˈka.dɐ ˈma.kɐ.ku nu ˈsew ˈɡa.ʎu' WHERE phrase_text = 'Cada macaco no seu galho';
UPDATE phrases SET pronunciation = 'ˈka.zɐ ˈon.de nɐ̃w ˈa ˈɡa.tu uʒ ˈɾa.tuʃ ˈfa.zẽ ˈfa.ɾɾɐ' WHERE phrase_text = 'Casa onde não há gato, os ratos fazem farra';
UPDATE phrases SET pronunciation = 'ˈde ˈɡɾɐ̃w ẽ ˈɡɾɐ̃w ɐ ˈɡa.li.ɲɐ ˈɛ̃.ʃi u ˈpa.pu' WHERE phrase_text = 'De grão em grão a galinha enche o papo';

-- Dutch: Update to proper Dutch phonetic notation
UPDATE phrases SET pronunciation = 'ɪt ɪs ɛəɫ ˈɣɛxɛvə ˈoːɫ ˈɣɛxɛvə' WHERE phrase_text = 'Het is al gegeven, al gegeven';
UPDATE phrases SET pronunciation = 'ɪt ɪs ɛəɫ ˈɣɛxɛvə ˈoːɫ ˈɣɛxɛvə' WHERE phrase_text = 'Beter een vogel in de hand dan tien in de lucht';
UPDATE phrases SET pronunciation = 'ˈʋaː ˈoːɫə ˈdɑːɣə ˈɣɛʊ̯ksmɑːkə ˈneː' WHERE phrase_text = 'Wat alle dagen gewoonte, neen';
UPDATE phrases SET pronunciation = 'ˈkɑːtsə ˈɛn də ˈdɑːk ˈɑːf ˈɣɛɫuʝə ˈzɑːk' WHERE phrase_text = 'Katten en de dak af, gelukkige zaak';
UPDATE phrases SET pronunciation = 'ˈeːnə ˈɣɛkə ˈkoːmtər ˈzeːɫdə ˈɑːɫeːn' WHERE phrase_text = 'Een gek komt er zelden alleen';

-- Polish: Update to proper Polish phonetic notation
UPDATE phrases SET pronunciation = 'ˈmjɛt͡ɕ ˈmuxɨ v ˈnɔɕɛ' WHERE phrase_text = 'Mieć muchy w nosie';
UPDATE phrases SET pronunciation = 'ˈkɔt ma ˈsɛdɛm ˈʑɨt͡ɕ' WHERE phrase_text = 'Kot ma siedem żyć';
UPDATE phrases SET pronunciation = 'ˈɔbɔ albo ˈɔbɔ' WHERE phrase_text = 'Abo abo';
UPDATE phrases SET pronunciation = 'ˈmjɛt͡ɕ ˈrɔzum jak ˈkɔva dɔ ˈpɔdkɔvɨ' WHERE phrase_text = 'Mieć rozum jak kowa do podkowy';
UPDATE phrases SET pronunciation = 'ˈt͡ɕɛʂka ˈrɔbɔta' WHERE phrase_text = 'Ciężka robota';

-- Hebrew: Update to proper Hebrew phonetic transcription
UPDATE phrases SET pronunciation = 'ʃaˈlom' WHERE phrase_text = 'שלום' AND language = 'hebrew';
UPDATE phrases SET pronunciation = 'toˈda' WHERE phrase_text = 'תודה' AND language = 'hebrew';
UPDATE phrases SET pronunciation = 'beˈseder' WHERE phrase_text = 'בסדר' AND language = 'hebrew';
UPDATE phrases SET pronunciation = 'ˈeχ korˈim ˈleχa' WHERE phrase_text = 'איך קוראים לך?' AND language = 'hebrew';
UPDATE phrases SET pronunciation = 'lehitraˈot' WHERE phrase_text = 'להתראות' AND language = 'hebrew';

-- Filipino: Update to proper Filipino phonetic notation
UPDATE phrases SET pronunciation = 'aŋ hinˈdi maruˈnoŋ lumiˈŋon sa pinaŋgaliˈŋan aj hinˈdi makarara­ˈtiŋ sa paro­ro­oˈnan' WHERE phrase_text = 'Ang hindi marunong lumingon sa pinanggalingan ay hindi makararating sa paroroonan';
UPDATE phrases SET pronunciation = 'kaˈpaɡ maj tiˈjaɡa maj niˈlaɡa' WHERE phrase_text = 'Kapag may tiyaga, may nilaga';
UPDATE phrases SET pronunciation = 'aŋ ˈtaoŋ naɡiˈɡipit sa ˈpatalim kumaˈkapit' WHERE phrase_text = 'Ang taong nagigipit, sa patalim kumakapit';
UPDATE phrases SET pronunciation = 'ˈnasa ˈhuli aŋ paɡsiˈsisi' WHERE phrase_text = 'Nasa huli ang pagsisisi';
UPDATE phrases SET pronunciation = 'ˈpaɡ maj ˈisinuksok maj maduduˈkot' WHERE phrase_text = 'Pag may isinuksok, may madudukot';

-- Add proper IPA notation for remaining languages where needed
-- Mandarin (keep existing Pinyin but ensure tone marks are correct)
UPDATE phrases SET pronunciation = 'mù bù jiàn sēn' WHERE phrase_text = '木不见森' AND pronunciation = 'mu bu jian sen';
UPDATE phrases SET pronunciation = 'shuǐ dī shí chuān' WHERE phrase_text = '水滴石穿' AND pronunciation = 'shui di shi chuan';
UPDATE phrases SET pronunciation = 'yī cùn guāng yīn yī cùn jīn' WHERE phrase_text = '一寸光阴一寸金' AND pronunciation = 'yi cun guang yin yi cun jin';
UPDATE phrases SET pronunciation = 'shū shān yǒu lù qín wéi jìng' WHERE phrase_text = '书山有路勤为径' AND pronunciation = 'shu shan you lu qin wei jing';
UPDATE phrases SET pronunciation = 'bǎi wén bù rú yī jiàn' WHERE phrase_text = '百闻不如一见' AND pronunciation = 'bai wen bu ru yi jian';
