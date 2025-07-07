-- Remove simple greetings and basic vocabulary that aren't complex idioms
DELETE FROM phrases WHERE 
id IN (
  'cbf78a78-e221-44e6-bac5-5664fc04847d', -- Hello (sinhala)
  'b764747c-ba12-406c-a6a5-60486d857b21', -- Hello (fijian) 
  'dedbaa7a-a88f-46cc-84e5-b4ed0c33d09c', -- Hello (indonesian)
  '2af19967-9ba6-4458-a9e7-fcdb0e659fdc', -- Hello (chamorro)
  '57d68090-07e0-40cc-a580-c02c8c892acf', -- Hello (māori)
  '48901520-6261-4daf-8081-a8b67d17130e', -- Hello (tongan)
  'c8da7963-eb21-4609-b035-583f7b7fa63c', -- Hello (romanian)
  'e6a3cfc8-d3c4-4037-b3b6-cd652865142e', -- Hello (samoan)
  'd5c25a18-239d-4381-ac45-d4f9f0df2541', -- Hello (bulgarian)
  'da0fdba0-87e0-4d2d-9f9b-f6ed202e91b6', -- Hello (ukrainian)
  '666b0447-caa2-4fb8-9f65-78331dcc23aa', -- Hello (mongolian)
  'c6b19a63-ccd8-4ad3-9d48-1825e4a306c4', -- Hello (burmese)
  '404b6f78-b16a-471c-83cb-9bbe07bfa498'  -- Hello (khmer)
);