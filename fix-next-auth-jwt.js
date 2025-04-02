import os

def remove_commented_filepath_from_start(directory):
    for root, _, files in os.walk(directory):
        for filename in files:
            filepath = os.path.join(root, filename)

            try:
                with open(filepath, 'r', encoding='utf-8') as f:
                    lines = f.readlines()

                # Build the expected header line
                expected_line = f'# "{filename}" = "{os.path.abspath(filepath)}"\n'

                # If the first line matches, remove it
                if lines and lines[0] == expected_line:
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.writelines(lines[1:])
                    print(f"🧹 Removed header: {filepath}")
                else:
                    print(f"⏭️ No header to remove: {filepath}")

            except Exception as e:
                print(f"⚠️ Skipped: {filepath} due to error: {e}")

# 👇 Set to your travel directory path
target_directory = "./travel"

remove_commented_filepath_from_start(target_directory)
