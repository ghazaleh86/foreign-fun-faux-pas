-- Remove goodbye phrases, basic words, and simple expressions
DELETE FROM phrases WHERE 
id IN (
  '0100ee5d-293d-41d5-9455-de6c6a9e02f9', -- Goodbye (chamorro)
  'aa9e8607-029e-4d8d-a91d-54b3ab9ef53e', -- Goodbye (tongan)
  '9d8e50ab-4d47-4cc6-8ba6-c798ba229d9a', -- Goodbye (sicilian)
  '2efb6f89-df86-4b52-bb37-4428e68c5131', -- Goodbye (corsican)
  'b36fe4e7-693a-444c-9893-e6bf197f455d', -- Goodbye (faroese)
  '4be38f8d-3218-4b66-886a-679493c9cb72', -- Goodbye (fijian)
  '003671fb-2d2c-4632-99df-f689a1f7a81d', -- Goodbye (samoan)
  '2bf3519c-be59-4cb2-b604-6046712252ff', -- Hi (croatian)
  'dc732ee4-205b-4fe2-b9db-47967adc8889', -- Hi/Bye (hungarian)
  '9a15090f-e20c-4184-a980-551728a72cc2', -- I am (chamorro)
  '21887ce9-68f9-410c-bf7b-b5eff7bc95e4', -- Today (mauritian creole)
  'e25faa3e-b5e2-4ce9-aa71-0de579b4096c', -- Cheers (maltese)
  '109e0d71-a595-48ed-931d-c95d37852801', -- Come on, let's go, hurry up (arabic)
  '9166ffbf-0424-45ac-9483-b0a2ef0cdff3', -- I don't know (with shoulder shrug) (italian)
  '5797c4cc-ee24-4b44-a458-330557a412dd', -- Okay/Alright (hebrew)
  '85416540-9d62-4431-b0eb-4d9b33fa4b77', -- Peace/Hello (hebrew)
  '7fe94c69-a308-4c7c-9d14-40c386ae2422', -- Fool/idiot (japanese)
  '7c372292-854c-4ba5-8b28-d8e8e13f9756'  -- Fool/dummy (korean)
);