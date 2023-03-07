# Encoding & Internationalization:

- https://www.joelonsoftware.com/2003/10/08/the-absolute-minimum-every-software-developer-absolutely-positively-must-know-about-unicode-and-character-sets-no-excuses/
- https://kunststube.net/encoding/

# It does not make sense to have a string without knowing what encoding it uses
### Plain text =/= ASCII

- ASCII --> 8 Bits
  - Below 32 are signals
  - 32-127 range is used for english characters
  - Became the ANSI standard == 0-127 same as ASCII , 128-255 :different based on where you lived
- Unicode: Letter maps to a code point (2 bytes == UCS-2 encoding), not a bit
  - platonic A is different than B, and different from a, but the same as different fonts of A
  - Every platonic letter is assigned a number by the unicode consortium: A --> U+0041
- UTF-8 encoding: A system for storing unicode code points
  - Every code point from 0-127 is stored in one byte
  - Code points 128 and above can be stored in up to 6 bytes

# What is an encoding?
- Layout / Structure of bytes in text
- Defined by ```
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    ``` in html. This needs to be the first thing in HTML
- Default is utf-8 assumed by react + django
