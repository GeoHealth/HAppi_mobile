using NUnit.Framework;

namespace HAppi.ClassLibrary.UnitTests
{
    public class DummyTests
    {
        [Test]
        public static void TestTrue()
        {
            Assert.True(true);
        }

        [Test]
        public static void TestTestMe()
        {
            Assert.AreEqual(1, MyClass.TestMe());
        }

        [Test]
        public static void ShouldFail()
        {
            Assert.True(false);
        }
    }
}
