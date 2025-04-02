import os
import re

def remove_all_headers_from_all_files(directory):
    for root, _, files in os.walk(directory):
        for filename in files:
            filepath = os.path.join(root, filename)

            try:
                with open(filepath, 'r', encoding='utf-8') as f:
                    lines = f.readlines()

                if not lines:
                    continue

                first_line = lines[0].strip()

                # Matches: # "filename.ext" = "some path"
                match_1 = re.match(r'^#\s*".+"\s*=\s*".+"$', first_line)
                # Matches: "file" = "some path"
                match_2 = re.match(r'^"file"\s*=\s*".+"$', first_line)

                if match_1 or match_2:
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.writelines(lines[1:])
                    print(f"🧹 Removed header from: {filepath}")
                else:
                    print(f"⏭️ No header in: {filepath}")

            except Exception as e:
                print(f"⚠️ Skipped: {filepath} due to error: {e}")

# 🔥 CLEAN EVERYTHING under ./travel/
remove_all_headers_from_all_files("./travel")
